import React, { useState, useEffect } from 'react';
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
    const [folders] = useState<string[]>(['Arrow', 'Devices', 'Interface', 'Media', 'Editor', 'Maps', 'Shape', 'Weather']); 
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('Shape');
    const [iconColor, setIconColor] = useState<string>('#000000');
    const [strokeColor, setStrokeColor] = useState<string>('#000000');
    const [strokeWidth, setStrokeWidth] = useState<number>(1);

    // تابع تشخیص سایز صفحه برای تنظیم مقدار اولیه فیلتر
    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsFilterVisible(false);  // موبایل
        } else {
            setIsFilterVisible(true);   // دسکتاپ
        }
    };

    // اعمال مقدار اولیه و گوش دادن به تغییر اندازه صفحه
    useEffect(() => {
        handleResize();  // اعمال اولیه
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleSliderChange = (value: number) => {
        setStrokeWidth(value);
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
        setActiveTab(tab);
    };

    const handleIconColorChange = (color: string) => {
        setIconColor(color);
        setStrokeColor(color);
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
                    changeColor={iconColor}  
                    onChangeColor={handleIconColorChange}  
                    initialTab={activeTab}
                />
            )}

            <div className='view'>
                <OrHeader 
                onSearch={handleSearch}
                toggleFilter={toggleFilter}
                isFilterVisible={isFilterVisible}
                 />
                <OrSubHeader toggleFilter={toggleFilter} isFilterVisible={isFilterVisible} />

                {activeTab === 'Stroke' && (
                    <StrokeIcon 
                        searchTerm={searchTerm}
                        selectedFolders={selectedFolders}
                        strokeColor= {strokeColor}
                        strokeWidth={strokeWidth}
                    />
                )}

                {activeTab === 'Shape' && (
                    <ShapeIcon  
                        searchTerm={searchTerm}
                        switchChecked={switchChecked}
                        selectedFolders={selectedFolders}
                        iconColor={iconColor}  
                    />
                )}
            </div>
        </div>
    );
};

export default Icons;
