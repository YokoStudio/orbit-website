// import React, { useState } from 'react';
// import './App.css';
// import IconList from './component/IconList/IconList';
// import OrHeader from './component/OrHeader/OrHeader';
// import OrFilter from './component/OrFilter/OrFilter';

// function App() {
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [borderSize, setBorderSize] = useState<number>(1);
//   const [switchChecked, setSwitchChecked] = useState<boolean>(true); // مقدار پیش‌فرض برای سوئیچ

//   const handleSearch = (term: string) => {
//     setSearchTerm(term);
//   };

//   const handleSliderChange = (value: number) => {
//     setBorderSize(value);
//   };

//   const handleSwitchChange = (checked: boolean) => {
//     setSwitchChecked(checked);
//   };

//   return (
//     <div>
//       <OrHeader onSearch={handleSearch} />
//       <div className='main-view'>
//       <OrFilter
//         borderSize={borderSize}
//         onSliderChange={handleSliderChange}
//         switchChecked={switchChecked}
//         onSwitchChange={handleSwitchChange}
//       />
//       <IconList searchTerm={searchTerm} borderSize={borderSize} switchChecked={switchChecked} />
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import './App.css';
import IconList from './component/IconList/IconList';
import OrHeader from './component/OrHeader/OrHeader';
import OrFilter from './component/OrFilter/OrFilter';

function App() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [borderSize, setBorderSize] = useState<number>(1);
    const [switchChecked, setSwitchChecked] = useState<boolean>(false);
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [folders, setFolders] = useState<string[]>(['Interface', 'Weather', 'this-test', 'alpha']); // باید با فولدرهای واقعی پر شود

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

    return (
        <div>
            <OrHeader onSearch={handleSearch} />
            <OrFilter
                borderSize={borderSize}
                onSliderChange={handleSliderChange}
                switchChecked={switchChecked}
                onSwitchChange={handleSwitchChange}
                folders={folders}
                selectedFolders={selectedFolders}
                onFolderChange={handleFolderChange}
                onResetFilters={handleReset}
            />
            <IconList
                searchTerm={searchTerm}
                borderSize={borderSize}
                switchChecked={switchChecked}
                selectedFolders={selectedFolders} // ارسال پراپرتی جدید به IconList
            />
        </div>
    );
}

export default App;

