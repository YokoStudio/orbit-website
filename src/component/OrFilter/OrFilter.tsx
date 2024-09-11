import React, { useState } from 'react';
import OrSlider from '../OrSlider/OrSlider';
import OrSwitch from '../OrSwitch/OrSwitch';
import OrCheckboxFilter from '../OrCheckboxFilter/OrCheckboxFilter'; // اضافه کردن OrCheckboxFilter
import './OrFilter.scss';
import '../../base/style.scss';
import TuneIcon from '../../assets/icons/tune.svg';
import Icon from "../../assets/Icon";
import OrButton from '../OrButton/OrButton';
import OrTab from '../OrTab/Ortab'

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
}) => {
    const [activeTab, setActiveTab] = useState<string>('Stroke'); // تب فعال

    // تب‌های موجود
    const tabs = ['Shape', 'Stroke'];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Shape':
                return (
                    <div className='customize-section'>
                        <OrSwitch checked={switchChecked} onChange={onSwitchChange} />
                        <OrSlider value={borderSize} onChange={onSliderChange} />
                    </div>
                );
            case 'Stroke':
                return (
                    <div className='checkbox-section'>
                        <OrCheckboxFilter  
                            folders={folders}
                            selectedFolders={selectedFolders}
                            onFolderChange={onFolderChange}
                            onResetFilters={onResetFilters}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='or-filter'>
            <div className='filter-body'>
                <div className='filter-header'> {/* header */}
                    <div>
                        <img src={TuneIcon} alt='Logo' width='32px' height='32px' />
                        <span className='h6-strong'>Customize</span>
                    </div>
                    <OrButton onClick={toggleFilter} appearance='ghost' variant='secondary' icon={<Icon.cross />} size='sm' />
                </div> 

                {/* کامپوننت OrTab برای نمایش تب‌ها */}
                <OrTab 
                    tabs={tabs} 
                    onTabChange={(tab: string) => {
                        console.log('Tab changed to:', tab); // برای بررسی تغییرات تب
                        setActiveTab(tab); // تب داخلی
                        onTabChange(tab);  // به‌روزرسانی تب در والد (Icons)
                    }} 
                />   

                {/* محتوای تب فعال */}
                {renderTabContent()}
            </div>

            <div className='backdrop' />
        </div>
    );
};

export default OrFilter;
