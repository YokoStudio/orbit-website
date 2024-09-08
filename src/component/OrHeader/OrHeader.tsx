import React, { useEffect, useState, ChangeEvent, ReactNode } from "react";
import axios from 'axios';
import './OrHeader.scss';
import OrButton from "../OrButton/OrButton";
import OrSearchInput from "../OrSearchInput/OrSearchInput";
import Logo from '../../assets/logo.svg';
import Icon from '../../assets/Icon';

interface OrHeaderProps {
    children?: ReactNode;
    onSearch: (searchTerm: string) => void;
}

const OrHeader: React.FC<OrHeaderProps> = ({ 
    children, 
    onSearch 
}) => { 
    const [iconCount, setIconCount] = useState<number>(0);

    // تابع برای خواندن تعداد آیکون‌ها از bucket
    const fetchIconCount = async () => {
        try {
            // دریافت لیست آیکون‌ها به صورت XML از bucket
            const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?list-type=2');

            // تبدیل XML به JSON
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, "application/xml");

            // گرفتن تمام تگ‌های <Key> که نشان دهنده مسیر آیکون‌ها هستند
            const keys = xmlDoc.getElementsByTagName("Key");

            // تعریف الگوی regex برای فیلتر کردن مسیرها
            const regex = /^Icons\/[^\/]+\/fill\/1\//;

            // فیلتر کردن آیکون‌هایی که با الگوی regex مطابقت دارند
            const filteredIcons = Array.from(keys).filter((key: any) =>
                regex.test(key.textContent)
            );

            // تنظیم تعداد آیکون‌های فیلتر شده
            setIconCount(filteredIcons.length);
        } catch (error) {
            console.error('Error fetching icon count:', error);
        }
    };

    // استفاده از useEffect برای فراخوانی تابع در هنگام بارگذاری کامپوننت
    useEffect(() => {
        fetchIconCount();
    }, []);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <div className='main-header'>
            <div className="logo">
                <a href="#"><img src={Logo} alt="logo" width="63px" height="47px"/></a>
            </div>
            <div className="icon-pack-title"> 
                <span className="t1-strong">Icon Pack</span> 
                <span className="b1">{iconCount} Icons</span> {/* نمایش تعداد آیکون‌ها */}
            </div>
            <div className="search-div">
                <OrSearchInput onChange={handleSearchChange} placeholder="Search..." size="lg" />
            </div>
            {children && <div className="children-container">{children}</div>}
            <div className="header-action">
                {/* <OrButton variant='secondary' appearance="fill" size="lg" text="Get Start"/> */}
                <OrButton variant='secondary' appearance="outline" size="lg" text="Download all"/>
            </div>
            <div className="mobile-actions">
                <OrButton variant='secondary' appearance="outline" size="lg" icon={<Icon.dwonload/>} />
            </div>
        </div>
    );
};

export default OrHeader;
