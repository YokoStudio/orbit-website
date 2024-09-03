import React, { ChangeEvent, ReactNode } from "react";
import './OrHeader.scss';
import OrButton from "../OrButton/OrButton";
import OrSearchInput from "../OrSearchInput/OrSearchInput";
import Logo from '../../assets/logo.svg';

// تعریف نوع Props
interface OrHeaderProps {
    children?: ReactNode;
    onSearch: (searchTerm: string) => void; // تابع جستجو
    
}

const OrHeader: React.FC<OrHeaderProps> = ({ 
    children, 
    onSearch 
}) => { 
    // تابع برای مدیریت تغییرات در ورودی جستجو
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <div className='header'>
            <div className="logo">
                <a href="#"><img src={Logo} alt="logo" width="63px" height="47px"/></a>
            </div>
            <div className="icon-pack-title"> 
                <span className="t1-strong">Icon Pack</span> 
                <span className="b1">1245 Icons</span>
            </div>
            <div className="search-div">
                <OrSearchInput onChange={handleSearchChange} placeholder="Search..." size="lg" />
            </div>
            {children && <div className="children-container">{children}</div>}
            <div className="header-action">
                {/* دکمه‌ای که وضعیت نمایش فیلتر را تغییر می‌دهد */}
                <OrButton 
                    variant='secondary' 
                    appearance="fill" 
                    size="lg" 
                    text="Get Start"
                />
                <OrButton variant='secondary' appearance="outline" size="lg" text="Download all"/>
            </div>
        </div>
    );
};

export default OrHeader;
