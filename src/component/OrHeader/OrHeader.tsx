import React, { ChangeEvent, ReactNode } from "react";
import './OrHeader.scss';
import OrButton from "../OrButton/OrButton";
import OrSearchInput from "../OrSearchInput/OrSearchInput";
import Logo from '../../assets/logo.svg';
import SearchIcon from '../../assets/icons/search.svg';

// تعریف نوع Props
interface OrHeaderProps {
    children?: ReactNode;
    onSearch: (searchTerm: string) => void; // تابع جستجو
}

const OrHeader: React.FC<OrHeaderProps> = ({ children, onSearch }) => { 
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
                    <div className="search-box" >
                    <img src={SearchIcon} alt="search" width="16px" height="16px"/>
                    <input 
                        className="body1"
                        type="text" 
                        placeholder="Search..." 
                        onChange={handleSearchChange} // متصل کردن تابع جستجو
                    />
                    </div>
                    {/* <OrSearchInput onChange={handleSearchChange} /> */}
            </div>
            {children && <div className="children-container">{children}</div>}
            <OrButton variant='secondary' appearance="fill" size="lg" text="Get started"/>
            <OrButton variant='secondary' appearance="outline" size="lg" text="Download all"/>
        </div>
    );
};

export default OrHeader;
