// import React, { useState, useEffect } from 'react';
// import './OrCheckboxFilter.scss';
// import OrButton from '../OrButton/OrButton';
// import '../../base/style.scss';
// import axios from 'axios';
// import '../../base/type-style.scss';


// interface OrCheckboxFilterProps {
//     folders: string[]; // اضافه کردن folders
//     selectedFolders: string[]; // اضافه کردن selectedFolders
//     onFolderChange: (folders: string[]) => void; // تغییر نام تابع
//     onResetFilters: () => void; // تغییر نام تابع
// }

// const OrCheckboxFilter: React.FC<OrCheckboxFilterProps> = ({
//     folders,
//     selectedFolders,
//     onFolderChange,
//     onResetFilters,
// }) => {
//     const handleCheckboxChange = (folder: string) => {
//         const updatedFolders = selectedFolders.includes(folder)
//             ? selectedFolders.filter(f => f !== folder)
//             : [...selectedFolders, folder];
//         onFolderChange(updatedFolders);
//     };

//     const handleReset = () => {
//         onResetFilters();
//     };

//     const [iconCounts, setIconCounts] = useState<{ [key: string]: number }>({});

//     useEffect(() => {
//         fetchIconCounts();
//     }, []);

//     const fetchIconCounts = async () => {
//         try {
//             const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?list-type=2');
//             const parser = new DOMParser();
//             const xmlDoc = parser.parseFromString(response.data, "application/xml");
//             const keys = xmlDoc.getElementsByTagName("Key");

//             // شمارش تعداد آیکون‌ها برای هر فولدر
//             const counts: { [key: string]: number } = {};
            
//             Array.from(keys).forEach((key: Element) => {
//                 const filePath = key.textContent || '';
//                 if (filePath.endsWith('.svg')) {
//                     folders.forEach(folder => {
//                         // بررسی اینکه آیا فایل در فولدر خاصی هست یا نه
//                         const regex = new RegExp(`${folder}/`);
//                         if (regex.test(filePath)) {
//                             counts[folder] = (counts[folder] || 0) + 1;
//                         }
//                     });
//                 }
//             });

//             setIconCounts(counts);
//         } catch (error) {
//             console.error('Error fetching icon counts:', error);
//         }
//     };

//     // تفکیک فولدرهای چک شده و چک نشده
//     const checkedFolders = folders.filter(folder => selectedFolders.includes(folder));
//     const uncheckedFolders = folders.filter(folder => !selectedFolders.includes(folder));

//     return (
//         <div className='category-section'>
//             <div className='category-list-title-box'>
//                 <span className='t2-strong'>Category</span>
//                 <OrButton layout='text' onClick={handleReset} variant='secondary' appearance='outline' text='Reset' size='xs' />
//             </div>

//             {/* ابتدا فولدرهای چک شده رندر می‌شود */}
//             {checkedFolders.map(folder => {
//                 const catIcon = `https://s3.ir-thr-at1.arvanstorage.ir/orbit-website/folderIcon/${folder}.svg`;

//                 return (
//                     <div key={folder} className='checkbox-container'>
//                         <label className='container'>
//                             <input
//                                 className='checkbox'
//                                 type="checkbox"
//                                 id={folder}
//                                 checked={selectedFolders.includes(folder)}
//                                 onChange={() => handleCheckboxChange(folder)}
//                             />
//                             <svg className='plus' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7V11.25H7C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75H11.25V17C11.25 17.4142 11.5858 17.75 12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V12.75H17C17.4142 12.75 17.75 12.4142 17.75 12C17.75 11.5858 17.4142 11.25 17 11.25H12.75V7Z" fill="black" />
//                             </svg>

//                             <svg className='minus' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path fillRule="evenodd" clipRule="evenodd" d="M7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12Z" fill="black" />
//                             </svg>
//                             <img src={catIcon} alt={folder} />
//                             <label className='checkmark' htmlFor={folder}>{folder}</label>
//                             <label>{iconCounts[folder] || 0}</label> {/* نمایش تعداد آیکون‌ها برای هر فولدر */}
//                         </label>
//                     </div>
//                 );
//             })}

//             {/* سپس فولدرهای چک نشده رندر می‌شود */}
//             {uncheckedFolders.map(folder => {
//                 const catIcon = `https://s3.ir-thr-at1.arvanstorage.ir/orbit-website/folderIcon/${folder}.svg`;

//                 return (
//                     <div key={folder} className='checkbox-container'>
//                         <label className='container'>
//                             <input
//                                 className='checkbox'
//                                 type="checkbox"
//                                 id={folder}
//                                 checked={selectedFolders.includes(folder)}
//                                 onChange={() => handleCheckboxChange(folder)}
//                             />
//                             <svg className='plus' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7V11.25H7C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75H11.25V17C11.25 17.4142 11.5858 17.75 12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V12.75H17C17.4142 12.75 17.75 12.4142 17.75 12C17.75 11.5858 17.4142 11.25 17 11.25H12.75V7Z" fill="black" />
//                             </svg>

//                             <svg className='minus' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path fillRule="evenodd" clipRule="evenodd" d="M7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12Z" fill="black" />
//                             </svg>
//                             <img src={catIcon} alt={folder} />
//                             <label className=' b1 checkmark' htmlFor={folder}>{folder}</label>
//                             <label className=' b1'>{iconCounts[folder] || 0}</label> {/* نمایش تعداد آیکون‌ها برای هر فولدر */}
//                         </label>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

// export default OrCheckboxFilter;
import React, { useState, useEffect } from 'react';
import './OrCheckboxFilter.scss';
import OrButton from '../OrButton/OrButton';
import '../../base/style.scss';
import axios from 'axios';
import '../../base/type-style.scss';


interface OrCheckboxFilterProps {
    folders: string[]; // اضافه کردن folders
    selectedFolders: string[]; // اضافه کردن selectedFolders
    onFolderChange: (folders: string[]) => void; // تغییر نام تابع
    onResetFilters: () => void; // تغییر نام تابع
}

const OrCheckboxFilter: React.FC<OrCheckboxFilterProps> = ({
    folders,
    selectedFolders,
    onFolderChange,
    onResetFilters,
}) => {
    const handleCheckboxChange = (folder: string) => {
        const updatedFolders = selectedFolders.includes(folder)
            ? selectedFolders.filter(f => f !== folder)
            : [...selectedFolders, folder];
        onFolderChange(updatedFolders);
    };

    const handleReset = () => {
        onResetFilters();
    };

    const [iconCounts, setIconCounts] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        fetchIconCounts();
    }, []);

    const fetchIconCounts = async () => {
        try {
            const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?list-type=2');
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, "application/xml");
            const keys = xmlDoc.getElementsByTagName("Key");

            // شمارش تعداد آیکون‌ها برای هر فولدر
            const counts: { [key: string]: number } = {};
            
            Array.from(keys).forEach((key: Element) => {
                const filePath = key.textContent || '';
                if (filePath.endsWith('.svg')) {
                    folders.forEach(folder => {
                        // بررسی اینکه آیا فایل در فولدر خاصی هست یا نه
                        const regex = new RegExp(`stroke/${folder}/`);
                        if (regex.test(filePath)) {
                            counts[folder] = (counts[folder] || 0) + 1;
                        }
                    });
                }
            });

            setIconCounts(counts);
        } catch (error) {
            console.error('Error fetching icon counts:', error);
        }
    };

    // تفکیک فولدرهای چک شده و چک نشده
    const checkedFolders = folders.filter(folder => selectedFolders.includes(folder));
    const uncheckedFolders = folders.filter(folder => !selectedFolders.includes(folder));

    return (
        <div className='category-section'>
            <div className='category-list-title-box'>
                <span className='t2-strong'>Category</span>
                <OrButton layout='text' onClick={handleReset} variant='secondary' appearance='outline' text='Reset' size='xs' />
            </div>
    
            {/* اگر فولدرهای چک شده وجود دارند، عنوان Selected را نمایش بده */}
            {checkedFolders.length > 0 && <div className='b2 section-title'>Selected<hr className='divider'/></div>}
            {checkedFolders.map(folder => {
                const catIcon = `https://s3.ir-thr-at1.arvanstorage.ir/orbit-website/folderIcon/${folder}.svg`;
                return (
                    <div key={folder} className='checkbox-container'>
                        <label className='container'>
                            <input
                                className='checkbox'
                                type="checkbox"
                                id={folder}
                                checked={selectedFolders.includes(folder)}
                                onChange={() => handleCheckboxChange(folder)}
                            />
                             <svg className='plus' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.75 6C12.75 5.58579 12.4142 5.25 12 5.25C11.5858 5.25 11.25 5.58579 11.25 6V11.25H6C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75H11.25V18C11.25 18.4142 11.5858 18.75 12 18.75C12.4142 18.75 12.75 18.4142 12.75 18V12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H12.75V6Z" fill="black"/>
                            </svg>

                            <svg className='minus' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H18C18.4142 11.25 18.75 11.5858 18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H6C5.58579 12.75 5.25 12.4142 5.25 12Z" fill="black"/>
                            </svg>

                            <img className='folder-icon' src={catIcon} alt={folder} />
                            <label className='checkmark' htmlFor={folder}>{folder}</label>
                            <label className='icon-count'>{iconCounts[folder] || 0}</label>
                        </label>
                    </div>
                );
            })}
    
            {/* اگر فولدرهای چک نشده وجود دارند، عنوان Unselected را نمایش بده */}
            {uncheckedFolders.length > 0 && <div className='b2 section-title'>Unselected<hr className='divider'/></div>}
            {uncheckedFolders.map(folder => {
                const catIcon = `https://s3.ir-thr-at1.arvanstorage.ir/orbit-website/folderIcon/${folder}.svg`;
                return (
                    <div key={folder} className='checkbox-container'>
                        <label className='container'>
                            <input
                                className='checkbox'
                                type="checkbox"
                                id={folder}
                                checked={selectedFolders.includes(folder)}
                                onChange={() => handleCheckboxChange(folder)}
                            />
                            <svg className='plus' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.75 6C12.75 5.58579 12.4142 5.25 12 5.25C11.5858 5.25 11.25 5.58579 11.25 6V11.25H6C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75H11.25V18C11.25 18.4142 11.5858 18.75 12 18.75C12.4142 18.75 12.75 18.4142 12.75 18V12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H12.75V6Z" fill="black"/>
                            </svg>

                            <svg className='minus' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H18C18.4142 11.25 18.75 11.5858 18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H6C5.58579 12.75 5.25 12.4142 5.25 12Z" fill="black"/>
                            </svg>
                            
                            <img className='folder-icon' src={catIcon} alt={folder} />
                            <label className='checkmark' htmlFor={folder}>{folder}</label>
                            <label className='icon-count'>{iconCounts[folder] || 0}</label>
                        </label>
                    </div>
                );
            })}
        </div>
    );
}

export default OrCheckboxFilter;
