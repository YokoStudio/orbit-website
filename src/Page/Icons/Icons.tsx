// import React, { useState } from 'react';
// import './Icons.scss'; 
// import ShapeIcon from '../../component/ShapeIcon/ShapeIcon';
// import StrokeIcon from '../../component/StrokeIcon/StrokeIcon';
// import OrHeader from '../../component/OrHeader/OrHeader';
// import OrFilter from '../../component/OrFilter/OrFilter';
// import '../../base/style.scss';
// import OrSubHeader from '../../component/OrSubHeader/OrSubHeader';

// const Icons: React.FC = () => {
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [borderSize, setBorderSize] = useState<number>(1);
//     const [switchChecked, setSwitchChecked] = useState<boolean>(true);
//     const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
//     const [folders, setFolders] = useState<string[]>(['Interface', 'Weather']); 
//     const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
//     const [activeTab, setActiveTab] = useState<string>('Shape'); 
//     const [iconColor, setIconColor] = useState<string>('#e01515');
//     const [changeColor, setChangeColor] = useState<string>('#e01515');

//     const handleSearch = (term: string) => {
//         setSearchTerm(term);
//     };

//     const handleSliderChange = (value: number) => {
//         setBorderSize(value);
//     };

//     const handleSwitchChange = (checked: boolean) => {
//         setSwitchChecked(checked);
//     };

//     const handleFolderChange = (folders: string[]) => {
//         setSelectedFolders(folders);
//     };

//     const handleReset = () => {
//         setSelectedFolders([]);
//     };

//     const toggleFilter = () => {
//         setIsFilterVisible(prevState => !prevState);
//     };

//     const handleTabChange = (tab: string) => {
//         setActiveTab(tab); // به روزرسانی تب فعال
//     };

    

//     const handleIconColorChange = (color: string) => {
//         setIconColor(color); // رنگ جدید را به حالت کامپوننت والد اعمال کنید
//     };

//     return (
//         <div className='main'>
//             {isFilterVisible && (
//                 <OrFilter 
//                 borderSize={1} 
//                 onSliderChange={() => {}} 
//                 switchChecked={true} 
//                 onSwitchChange={() => {}} 
//                 folders={['Interface', 'Weather']} 
//                 selectedFolders={[]} 
//                 onFolderChange={() => {}} 
//                 onResetFilters={() => {}} 
//                 toggleFilter={() => {}} 
//                 isFilterVisible={true} 
//                 onTabChange={() => {}} 
//                 changeColor={iconColor}  // رنگ را به `OrFilter` ارسال کنید
//                 onChangeColor={handleIconColorChange}  // تابع تغییر رنگ را به `OrFilter` ارسال کنید
//             />
//             )}

//             <div className='view'>
//                 <OrHeader onSearch={handleSearch} />
//                 <OrSubHeader toggleFilter={toggleFilter} isFilterVisible={isFilterVisible} />

//                 {activeTab === 'Stroke' && (
//                     <StrokeIcon 
//                         searchTerm={searchTerm}
//                         selectedFolders={selectedFolders}
//                     />
//                 )}

//                 {activeTab === 'Shape' && (
//                     <ShapeIcon  
//                         searchTerm={searchTerm}
//                         switchChecked={switchChecked}
//                         selectedFolders={selectedFolders}
//                         iconColor={handleIconColorChange} // ارسال رنگ به ShapeIcon
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Icons;
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
    const [folders] = useState<string[]>(['Interface', 'Weather']); // ثابت نگه‌داشتن لیست پوشه‌ها
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('Shape');
    const [iconColor, setIconColor] = useState<string>('#000000'); // رنگ اولیه آیکون
    const [strokeColor, setStrokeColor] = useState<string>('#000000'); // رنگ ��دید ��یکون
    const [strokeWidth, setStrokeWidth] = useState<number>(2);

    // جستجو
    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    // تغییر سایز حاشیه
    const handleSliderChange = (value: number) => {
        setStrokeWidth(value);
        setBorderSize(value);
    };

    // تغییر وضعیت سوییچ
    const handleSwitchChange = (checked: boolean) => {
        setSwitchChecked(checked);
    };

    // تغییر پوشه‌های انتخاب‌شده
    const handleFolderChange = (folders: string[]) => {
        setSelectedFolders(folders);
    };

    // بازنشانی فیلترها
    const handleReset = () => {
        setSelectedFolders([]);
    };

    // نمایش یا پنهان کردن فیلتر
    const toggleFilter = () => {
        setIsFilterVisible(prevState => !prevState);
    };

    // تغییر تب فعال
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    // تغییر رنگ آیکون
    const handleIconColorChange = (color: string) => {
        setIconColor(color);
        setStrokeColor(color);
        
    }

    return (
        <div className='main'>
            {/* نمایش فیلتر فقط در صورت true بودن isFilterVisible */}
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
                    changeColor={iconColor}  // رنگ فعلی را ارسال می‌کنیم
                    onChangeColor={handleIconColorChange}  // تابع تغییر رنگ
                />
            )}

            <div className='view'>
                <OrHeader onSearch={handleSearch} />
                <OrSubHeader toggleFilter={toggleFilter} isFilterVisible={isFilterVisible} />

                {/* نمایش آیکون‌ها بر اساس تب فعال */}
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
                        iconColor={iconColor}  // ارسال مقدار رنگ به ShapeIcon
                    />
                )}
            </div>
        </div>
    );
};

export default Icons;
