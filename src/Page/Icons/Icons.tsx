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
    const [switchChecked, setSwitchChecked] = useState<boolean>(false);
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [folders, setFolders] = useState<string[]>(['Arrow', 'Devices', 'File + Documents', 'Interface', 'Weather']); 
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>('Shape'); 

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
                    onTabChange={handleTabChange} // ارسال تابع تغییر تب
                />
            )}
            <div className='view'>
                <OrHeader onSearch={handleSearch} />
                <OrSubHeader toggleFilter={toggleFilter} isFilterVisible={isFilterVisible} />
                
                {activeTab === 'Stroke' && (
                    <StrokeIcon 
                        searchTerm={searchTerm}
                        borderSize={borderSize}
                        switchChecked={switchChecked}
                        selectedFolders={selectedFolders}
                    />
                    )}

                {activeTab === 'Shape' && (
                    <ShapeIcon  
                        searchTerm={searchTerm}
                        borderSize={borderSize}
                        switchChecked={switchChecked}
                        selectedFolders={selectedFolders}
                    />
                    )}

            </div>
        </div>
    );
};

export default Icons;
