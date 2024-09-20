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
    onResetFilters
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

    return (
        <div className='category-section'>
            <div className='category-list-title-box'>
                <span className='t2-strong'>Category</span>
                <OrButton layout='text' onClick={handleReset} variant='secondary' appearance='outline' text='Reset' size='xs'/>
            </div>
            {folders.map(folder => (
                <div key={folder} className='checkbox-container'>
                    <label className='container'>
                            
                        <input
                            className='checkbox'
                            type="checkbox"
                            id={folder}
                            checked={selectedFolders.includes(folder)}
                            onChange={() => handleCheckboxChange(folder)}
                        />

                        <label className='checkmark' htmlFor={folder}>{folder}</label>

                    </label>
                </div>
            ))}
        </div>
    );
};

export default OrCheckboxFilter;
