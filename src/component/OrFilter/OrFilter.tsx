// import React from 'react';
// import OrSlider from '../OrSlider/OrSlider';
// import OrSwitch from '../OrSwitch/OrSwitch';
// import './OrFilter.scss';

// // تعریف نوع Props
// interface OrFilterProps {
//     borderSize: number;
//     onSliderChange: (value: number) => void;
//     switchChecked: boolean;
//     onSwitchChange: (checked: boolean) => void;
// }

// const OrFilter: React.FC<OrFilterProps> = ({ borderSize, onSliderChange, switchChecked, onSwitchChange }) => {
//     return (
//         <div className='filter'>
//             <OrSlider value={borderSize} onChange={onSliderChange} />
//             <OrSwitch checked={switchChecked} onChange={onSwitchChange} />
//         </div>
//     );
// };

// export default OrFilter;
// import React, { useState, useEffect } from 'react';
// import OrSlider from '../OrSlider/OrSlider';
// import OrSwitch from '../OrSwitch/OrSwitch';
// import './OrFilter.scss';

// // تعریف نوع Props
// interface OrFilterProps {
//     borderSize: number;
//     onSliderChange: (value: number) => void;
//     switchChecked: boolean;
//     onSwitchChange: (checked: boolean) => void;
//     folders: string[];
//     selectedFolders: string[];
//     onFolderChange: (folders: string[]) => void;
//     onReset: () => void;
// }

// const OrFilter: React.FC<OrFilterProps> = ({
//     borderSize,
//     onSliderChange,
//     switchChecked,
//     onSwitchChange,
//     folders,
//     selectedFolders,
//     onFolderChange,
//     onReset
// }) => {
//     const handleFolderChange = (folder: string) => {
//         const updatedFolders = selectedFolders.includes(folder)
//             ? selectedFolders.filter(f => f !== folder)
//             : [...selectedFolders, folder];

//         onFolderChange(updatedFolders);
//     };

//     return (
//         <div className='filter'>
//             <OrSlider value={borderSize} onChange={onSliderChange} />
//             <OrSwitch checked={switchChecked} onChange={onSwitchChange} />
            
//             <div className="checkbox-container">
//                 <button onClick={onReset} className="reset-button">ریست</button>
//                 {folders.map((folder) => (
//                     <div key={folder} className="checkbox-item">
//                         <input
//                             type="checkbox"
//                             id={folder}
//                             checked={selectedFolders.includes(folder)}
//                             onChange={() => handleFolderChange(folder)}
//                         />
//                         <label htmlFor={folder}>{folder}</label>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default OrFilter;
import React from 'react';
import OrSlider from '../OrSlider/OrSlider';
import OrSwitch from '../OrSwitch/OrSwitch';
import OrCheckboxFilter from '../OrCheckboxFilter/OrCheckboxFilter'; // اضافه کردن OrCheckboxFilter
import './OrFilter.scss';

// تعریف نوع Props
interface OrFilterProps {
    borderSize: number;
    onSliderChange: (value: number) => void;
    switchChecked: boolean;
    onSwitchChange: (checked: boolean) => void;
    folders: string[];
    selectedFolders: string[];
    onFolderChange: (folders: string[]) => void;
    onResetFilters: () => void;
}

const OrFilter: React.FC<OrFilterProps> = ({
    borderSize,
    onSliderChange,
    switchChecked,
    onSwitchChange,
    folders,
    selectedFolders,
    onFolderChange,
    onResetFilters
}) => {
    return (
        <div className='filter'>
            <OrSlider value={borderSize} onChange={onSliderChange} />
            <OrSwitch checked={switchChecked} onChange={onSwitchChange} />
            {/* فیلتر پوشه‌ها */}
            <OrCheckboxFilter 
                folders={folders}
                selectedFolders={selectedFolders}
                onFolderChange={onFolderChange}
                onResetFilters={onResetFilters}
            />
        </div>
    );
};

export default OrFilter;
