// import React, { useEffect, useState, ChangeEvent, ReactNode } from "react";
// import axios from 'axios';
// import './OrHeader.scss';
// import OrButton from "../OrButton/OrButton";
// import OrSearchInput from "../OrSearchInput/OrSearchInput";
// import Logo from '../../assets/logo.svg';
// import Icon from '../../assets/Icon';
// import YokoLogo from '../../assets/Sign-logo-04.jpg';

// interface OrHeaderProps {
//     children?: ReactNode;
//     onSearch: (searchTerm: string) => void;
// }

// const OrHeader: React.FC<OrHeaderProps> = ({ 
//     children, 
//     onSearch 
// }) => { 
//     const [iconCount, setIconCount] = useState<number>(0);

//     // تابع برای خواندن تعداد آیکون‌ها از bucket
//     // const fetchIconCount = async () => {
//     //     try {
//     //         // دریافت لیست آیکون‌ها به صورت XML از bucket
//     //         const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?list-type=2');

//     //         // تبدیل XML به JSON
//     //         const parser = new DOMParser();
//     //         const xmlDoc = parser.parseFromString(response.data, "application/xml");

//     //         // گرفتن تمام تگ‌های <Key> که نشان دهنده مسیر آیکون‌ها هستند
//     //         const keys = xmlDoc.getElementsByTagName("Key");

//     //         // تعریف الگوی regex برای فیلتر کردن مسیرها
//     //         const regex = /^Icons\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\//;


//     //         // فیلتر کردن آیکون‌هایی که با الگوی regex مطابقت دارند
//     //         const filteredIcons = Array.from(keys).filter((key: any) =>
//     //             regex.test(key.textContent)
//     //         );

//     //         // تنظیم تعداد آیکون‌های فیلتر شده
//     //         setIconCount(filteredIcons.length);
//     //     } catch (error) {
//     //         console.error('Error fetching icon count:', error);
//     //     }
//     // };
//     const fetchIconCount = async () => {
//         try {
//             // دریافت لیست آیکون‌ها به صورت XML از bucket
//             const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?list-type=2');
    
//             // تبدیل XML به JSON
//             const parser = new DOMParser();
//             const xmlDoc = parser.parseFromString(response.data, "application/xml");
    
//             // گرفتن تمام تگ‌های <Key> که نشان دهنده مسیر آیکون‌ها هستند
//             const keys = xmlDoc.getElementsByTagName("Key");
    
//             // فیلتر کردن آیکون‌هایی که با فرمت SVG هستند
//             const svgIcons = Array.from(keys).filter((key: Element) => {
//                 const filePath = key.textContent || '';
//                 return filePath.endsWith('.svg');  // فقط فایل‌های SVG
//             });
    
//             // تنظیم تعداد آیکون‌های فیلتر شده
//             setIconCount(svgIcons.length);
//         } catch (error) {
//             console.error('Error fetching icon count:', error);
//         }
//     };
    
    
    

//     // استفاده از useEffect برای فراخوانی تابع در هنگام بارگذاری کامپوننت
//     useEffect(() => {
//         fetchIconCount();
//     }, []);

//     const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//         onSearch(event.target.value);
//     };

//     return (
//         <div className="main-header">
//             <div className='desk-header'>
//             <div className="desk-logo">
//                 <a href="#"><img src={Logo} alt="logo" width="63px" height="47px"/></a>
//             </div>
//             <div className="mobile-logo">
//                 <a href="#"><img src={YokoLogo} alt="logo" height="40px"/></a>
//             </div>
//             <div className="icon-pack-title"> 

//                 <span className="t1-strong">Icon Pack</span> 
//                 <span className="b1">{iconCount} Icons</span> {/* نمایش تعداد آیکون‌ها */}
//             </div>
//             <div className="search-div">
//                 <OrSearchInput onChange={handleSearchChange} placeholder="Search...." size="lg" />
//             </div>
//             {children && <div className="children-container">{children}</div>}
//             <div className="header-action">
//                 {/* <OrButton variant='secondary' appearance="fill" size="lg" text="Get Start"/> */}
//                 <OrButton layout="text" variant='secondary' appearance="outline" size="lg" text="Download all"/>
//             </div>
//             <div className="mobile-actions">
//                 <OrButton layout="icon" variant='secondary' appearance="outline" size="md" icon={<Icon.dwonload/>} />
//             </div>
//             </div>
//             <div className="search-div-mobile">
//                 <OrSearchInput onChange={handleSearchChange} placeholder="Search...." size="sm" />
//             </div>
//         </div>
//     );
// };

// export default OrHeader;

import React, { useEffect, useState, ChangeEvent, ReactNode } from "react";
import axios from 'axios';
import './OrHeader.scss';
import OrButton from "../OrButton/OrButton";
import OrSearchInput from "../OrSearchInput/OrSearchInput";
import Logo from '../../assets/logo.svg';
import Icon from '../../assets/Icon';
import YokoLogo from '../../assets/Sign-logo-04.jpg';
import Modal from '../OrDownloadModal/OrDownloadModal'; // Import the Modal component

interface OrHeaderProps {
    children?: ReactNode;
    onSearch: (searchTerm: string) => void;
    toggleFilter: () => void; 
    isFilterVisible: boolean;
}

const OrHeader: React.FC<OrHeaderProps> = ({ 
    children, 
    onSearch,
    toggleFilter, 
    isFilterVisible 
}) => { 
    const [iconCount, setIconCount] = useState<number>(123);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal

    const fetchIconCount = async () => {
        try {
            const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?list-type=2');
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, "application/xml");
            const keys = xmlDoc.getElementsByTagName("Key");
            const svgIcons = Array.from(keys).filter((key: Element) => {
                const filePath = key.textContent || '';
                return filePath.endsWith('.svg'); // Only SVG files
            });
            setIconCount(svgIcons.length);
        } catch (error) {
            console.error('Error fetching icon count:', error);
        }
    };

    useEffect(() => {
        fetchIconCount();
    }, []);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen); // Toggle modal open/close
    };
    const iconCountNumber = `Search on ${iconCount} icons ...`;

    return (
        <div className="main-header">
            <div className='desk-header'>
                <div className="logo">
                    <a href="#"><img src={Logo} alt="logo" /></a>
                </div>
                
                <div className="search-div">
                    <OrSearchInput onChange={handleSearchChange} placeholder={iconCountNumber} size="lg" />
                </div>
                {children && <div className="children-container">{children}</div>}
                <div className="header-action">
                    <OrButton 
                        layout="text" 
                        variant='secondary' 
                        appearance="outline" 
                        size="lg" 
                        text="Download all"
                        onClick={toggleModal} // Open modal on click
                    />
                </div>
                <div className="mobile-actions">
                   
                </div>
            </div>
            <div className="search-div-mobile">
                <OrSearchInput onChange={handleSearchChange} placeholder="Search...." size="sm" />
                <OrButton layout="icon-text" size="md" variant="secondary" appearance="outline" text="Filter" onClick={toggleFilter} icon={<Icon.tune/>}/>
                <OrButton onClick={toggleModal} layout="icon" variant='secondary' appearance="outline" size="md" icon={<Icon.dwonload/>} />
            </div>

            {/* Modal component */}
            <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <h2>Download Icons</h2>
                <p>Are you sure you want to download all icons?</p>
                <button onClick={toggleModal}>Close</button> {/* Close button */}
            </Modal>
        </div>
    );
};

export default OrHeader;
