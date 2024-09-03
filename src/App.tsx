import React, { useState } from 'react';
import './App.css';
import IconList from './component/IconList/IconList';
import OrHeader from './component/OrHeader/OrHeader';
import OrFilter from './component/OrFilter/OrFilter';
import './style.scss'
import OrSubHeader from './component/OrSubHeader/OrSubHeader';

function App() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [borderSize, setBorderSize] = useState<number>(1);
    const [switchChecked, setSwitchChecked] = useState<boolean>(false);
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [folders, setFolders] = useState<string[]>(['Interface', 'Weather', 'this-test', 'alpha']); // باید با فولدرهای واقعی پر شود
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(true);


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
                />
            )}
            <div className='view'>
            <OrHeader 
            onSearch={handleSearch}
            />

            <OrSubHeader
            toggleFilter={toggleFilter}
            isFilterVisible={isFilterVisible}
            />
            
            <IconList
                searchTerm={searchTerm}
                borderSize={borderSize}
                switchChecked={switchChecked}
                selectedFolders={selectedFolders} // ارسال پراپرتی جدید به IconList
            />
            </div>
            
        </div>
    );
}

export default App;