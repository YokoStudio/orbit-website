import React from 'react';
import OrSlider from '../OrSlider/OrSlider';
import OrSwitch from '../OrSwitch/OrSwitch';
import OrCheckboxFilter from '../OrCheckboxFilter/OrCheckboxFilter'; // اضافه کردن OrCheckboxFilter
import './OrFilter.scss';
import '../../bace/style.scss';

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
            <div>
                <div>
                    <img src='src/logo.png' alt='Logo' />
                    <span className='h6-strong'>Customize</span>
                </div> 
                <div>
                <OrSwitch checked={switchChecked} onChange={onSwitchChange} />
                <OrSlider value={borderSize} onChange={onSliderChange} />
                </div>
            </div>
            <div>
            <OrCheckboxFilter 
                folders={folders}
                selectedFolders={selectedFolders}
                onFolderChange={onFolderChange}
                onResetFilters={onResetFilters}
            />
            </div>
            
        </div>
    );
};

export default OrFilter;
