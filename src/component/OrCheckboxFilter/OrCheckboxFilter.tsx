import React, { useState, useEffect } from 'react';
import './OrCheckboxFilter.scss';
import OrButton from '../OrButton/OrButton';
import '../../base/style.scss';


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

    const catIcon = `foldericon/${folders}.svg`;

    return (
        <div className='category-section'>
            <div className='category-list-title-box'>
                <span className='t2-strong'>Category</span>
                <OrButton layout='text' onClick={handleReset} variant='secondary' appearance='outline' text='Reset' size='xs'/>
            </div>
            {folders.map(folder => (
                <div key={folder} className='checkbox-container'>
                    <label className='container'>
                        <img src={catIcon} />
                        <input
                            className='checkbox'
                            type="checkbox"
                            id={folder}
                            checked={selectedFolders.includes(folder)}
                            onChange={() => handleCheckboxChange(folder)}
                        />
                        <svg className='plus' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7V11.25H7C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75H11.25V17C11.25 17.4142 11.5858 17.75 12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V12.75H17C17.4142 12.75 17.75 12.4142 17.75 12C17.75 11.5858 17.4142 11.25 17 11.25H12.75V7Z" fill="black"/>
                        </svg>

                        <svg className='minus' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12Z" fill="black"/>
                        </svg>

                        <label className='checkmark' htmlFor={folder}>{folder}</label>

                    </label>
                </div>
            ))}
        </div>
    );
};

export default OrCheckboxFilter;
