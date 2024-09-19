import React, { useState } from 'react';
import './Icons.scss'; 
import ShapeIcon from '../../component/ShapeIcon/ShapeIcon';
import StrokeIcon from '../../component/StrokeIcon/StrokeIcon';
import OrHeader from '../../component/OrHeader/OrHeader';
import OrFilter from '../../component/OrFilter/OrFilter';
import '../../base/style.scss';
import OrSubHeader from '../../component/OrSubHeader/OrSubHeader';

const Icons: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [borderSize, setBorderSize] = useState<number>(1);
    const [switchChecked, setSwitchChecked] = useState<boolean>(true);
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [folders, setFolders] = useState<string[]>(['Interface', 'Weather']); 
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('Shape'); 
    const [iconColor, setIconColor] = useState<string>('#e01515');

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleSliderChange = (value: number) => {
        setBorderSize(value);
    };

    const handleSwitchChange = (checked: boolean) => {
        setSwitchChecked(checked);
    };

    const handleFolderChange = (folders: string[]) => {
        setSelectedFolders(folders);
    };

    const handleReset = () => {
        setSelectedFolders([]);
    };

    const toggleFilter = () => {
        setIsFilterVisible(prevState => !prevState);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab); // به روزرسانی تب فعال
    };

    const handleColorChange = (color: string) => {
        setIconColor(color); // به‌روزرسانی رنگ انتخاب شده
        console.log('Selected color:', color);
    };

    return (
        <div className='main'>
            {isFilterVisible && (
                <OrFilter
                    borderSize={borderSize}
                    onSliderChange={handleSliderChange}
                    switchChecked={switchChecked}
                    onSwitchChange={handleSwitchChange}
                    folders={folders}
                    selectedFolders={selectedFolders}
                    onFolderChange={handleFolderChange}
                    onResetFilters={handleReset}
                    toggleFilter={toggleFilter}
                    isFilterVisible={isFilterVisible}
                    onTabChange={handleTabChange} 
                   
                    onchangeColor={handleColorChange} // ارسال تابع تغییر رنگ
                />
            )}

            <div className='view'>
                <OrHeader onSearch={handleSearch} />
                <OrSubHeader toggleFilter={toggleFilter} isFilterVisible={isFilterVisible} />

                {activeTab === 'Stroke' && (
                    <StrokeIcon 
                        searchTerm={searchTerm}
                        selectedFolders={selectedFolders}
                    />
                )}

                {activeTab === 'Shape' && (
                    <ShapeIcon  
                        searchTerm={searchTerm}
                        switchChecked={switchChecked}
                        selectedFolders={selectedFolders}
                        iconColor={handleColorChange} // ارسال رنگ به ShapeIcon
                    />
                )}
            </div>
        </div>
    );
};

export default Icons;
