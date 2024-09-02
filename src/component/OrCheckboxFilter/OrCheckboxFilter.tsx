import React, { useState, useEffect } from 'react';
import './OrCheckboxFilter.scss';
import OrButton from '../OrButton/OrButton';

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
        <div className='filter-container'>
            <OrButton onClick={handleReset} variant='secondary' appearance='outline' text='reset'></OrButton>
            {folders.map(folder => (
                <div key={folder} className='checkbox-container'>
                    <input
                        type="checkbox"
                        id={folder}
                        checked={selectedFolders.includes(folder)}
                        onChange={() => handleCheckboxChange(folder)}
                    />
                    <label htmlFor={folder}>{folder}</label>
                </div>
            ))}
        </div>
    );
};

export default OrCheckboxFilter;
