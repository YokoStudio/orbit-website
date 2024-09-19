import React, { useState } from 'react';
import OrSlider from '../OrSlider/OrSlider';
import OrSwitch from '../OrSwitch/OrSwitch';
import OrCheckboxFilter from '../OrCheckboxFilter/OrCheckboxFilter';
import './OrFilter.scss';
import '../../base/style.scss';
import TuneIcon from '../../assets/icons/tune.svg';
import Icon from "../../assets/Icon";
import OrButton from '../OrButton/OrButton';
import OrTab from '../OrTab/Ortab'
import OrInput from '../OrInput/OrInput';

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
    onTabChange: (activeTab: string) => void;
    changeColor: string;
    onChangeColor: (color: string) => void; // ارسال رنگ به کامپوننت والد
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
    onTabChange,
    changeColor,
    onChangeColor
}) => {
    const [activeTab, setActiveTab] = useState<string>('Stroke'); 

    const handleColorChange = (color: string) => {
        onChangeColor(color); // ارسال رنگ به کامپوننت والد
    };

    const tabs = ['Stroke', 'Shape'];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Stroke':
                return (
                    <div className='customize-section'>
                        <OrSlider value={borderSize} onChange={onSliderChange} />
                    </div>
                );
            case 'Shape':
                return (
                    <div className='customize-section'>
                        <OrSwitch checked={switchChecked} onChange={onSwitchChange} />
                        <OrInput initialValue={changeColor} onColorChange={handleColorChange} /> {/* ارسال رنگ به OrInput */}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='or-filter'>
            <div className='filter-body'>
                <div className='filter-header'>
                    <div>
                        <img src={TuneIcon} alt='Tune' width='32px' height='32px' />
                        <span className='h6-strong'>Customize</span>
                    </div>
                    <OrButton onClick={toggleFilter} appearance='ghost' variant='secondary' icon={<Icon.cross />} size='sm' />
                </div>
                <OrTab 
                    tabs={tabs} 
                    onTabChange={(tab: string) => {
                        setActiveTab(tab); // به روزرسانی تب داخلی
                        onTabChange(tab); // به‌روزرسانی تب در والد (Icons)
                    }} 
                />   

                {renderTabContent()}
                <OrCheckboxFilter  
                    folders={folders}
                    selectedFolders={selectedFolders}
                    onFolderChange={onFolderChange}
                    onResetFilters={onResetFilters}
                />
            </div>

            <div className='backdrop' />
        </div>
    );
};

export default OrFilter;
