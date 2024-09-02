import React, { ChangeEvent, ReactNode } from "react";
import './OrHeader.scss';
import OrButton from "../OrButton/OrButton";

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
            <div>
                <img src="logo.png" alt="logo" />
            </div>
            <div> 
                <h1>Icon Pack</h1> 
                <p>1245 Icons</p>
            </div>
            <div className="search-div">
                <div className="search-box" >
                <input 
                    className="body1"
                    type="text" 
                    placeholder="Search..." 
                    onChange={handleSearchChange} // متصل کردن تابع جستجو
                />
                </div>
            </div>
            {children && <div className="children-container">{children}</div>}
            <OrButton variant='secondary' appearance="fill" size="lg" text="Get started"/>
            <OrButton variant='secondary' appearance="outline" size="lg" text="Download all"/>
        </div>
    );
};

export default OrHeader;
