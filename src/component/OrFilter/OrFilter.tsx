import React from 'react';
import OrSlider from '../OrSlider/OrSlider';
import OrSwitch from '../OrSwitch/OrSwitch';
import OrCheckboxFilter from '../OrCheckboxFilter/OrCheckboxFilter'; // اضافه کردن OrCheckboxFilter
import './OrFilter.scss';
import '../../base/style.scss';
import TuneIcon from '../../assets/icons/tune.svg';
import Icon from "../../assets/Icon";
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
        <div className='or-filter'>
            
            <div className='filter-body'>
                <div className='filter-header'> {/* header */}
                    <div>
                        <img src={TuneIcon} alt='Logo' width='32px' height='32px' />
                        <span className='h6-strong'>Customize</span>
                    </div>
                    <OrButton onClick={toggleFilter} appearance='ghost' variant='secondary' icon={<Icon.cross/>} size='sm'/>
                </div> 
                    
                <div className='customize-section'>
                    <OrSwitch checked={switchChecked} onChange={onSwitchChange} />
                    <OrSlider value={borderSize} onChange={onSliderChange} />
                </div>
        
                <div className='checkbox-section'>
                    <OrCheckboxFilter  
                        folders={folders}
                        selectedFolders={selectedFolders}
                        onFolderChange={onFolderChange}
                        onResetFilters={onResetFilters}
                    />
                </div>
            </div>

            <div className='backdrop'/>
        </div>
    );
};

export default OrFilter;
