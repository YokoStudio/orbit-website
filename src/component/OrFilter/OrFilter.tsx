import React from 'react';
import OrSlider from '../OrSlider/OrSlider';
import OrSwitch from '../OrSwitch/OrSwitch';
import OrCheckboxFilter from '../OrCheckboxFilter/OrCheckboxFilter'; // اضافه کردن OrCheckboxFilter
import './OrFilter.scss';
import '../../bace/style.scss';
import TuneIcon from '../../assets/icons/tune.svg';
import OrButton from '../OrButton/OrButton';

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
    toggleFilter: () => void; 
    isFilterVisible: boolean; 
}

const OrFilter: React.FC<OrFilterProps> = ({
    borderSize,
    onSliderChange,
    switchChecked,
    onSwitchChange,
    folders,
    selectedFolders,
    onFolderChange,
    onResetFilters,
    toggleFilter,
    isFilterVisible,

}) => {
    return (
        <div className='or-filter' id='my-filter'>
              
            <div className='filter-header'>
                    <img src={TuneIcon} alt='Logo' width='32px' height='32px' />
                    <span className='h6-strong'>Customize</span>
                    <OrButton 
                        text={isFilterVisible ? "Hide Filter" : "Show Filter"}
                        onClick={toggleFilter}
                    />
                </div> 
            <div>
                <div className='customize-section'>
                <OrSwitch checked={switchChecked} onChange={onSwitchChange} />
                <OrSlider value={borderSize} onChange={onSliderChange} />
                </div>
            </div>
            <div className='category-section'>
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
