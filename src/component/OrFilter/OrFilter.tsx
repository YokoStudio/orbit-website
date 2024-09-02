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
        <div className='or-filter'>
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
