import React, { useState, useEffect } from 'react';
import './Icons.scss'; 
import ShapeIcon from '../../component/IconList/ShapeIcon';
import StrokeIcon from '../../component/IconList/StrokeIcon';
import OrIconHeader from '../../component/OrIconHeader/OrIconHeader';
import OrFilter from '../../component/OrFilter/OrFilter';
import '../../base/style.scss';
import Modal from '../../component/OrDownloadModal/OrModal';
import OrButton from '../../component/OrButton/OrButton';
import figmaIcon from '../../assets/modalIcon/Figma.png'
import Icon from '../../assets/Icon';
const Icons: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [borderSize, setBorderSize] = useState<number>(1);
    const [switchChecked, setSwitchChecked] = useState<boolean>(false);
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [folders] = useState<string[]>(['Arrow', 'Devices','Document', 'Interface', 'Media', 'Editor', 'Maps', 'Shape', 'Weather']); 
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('Shape');
    const [iconColor, setIconColor] = useState<string>('#000000');
    const [strokeColor, setStrokeColor] = useState<string>('#000000');
    const [strokeWidth, setStrokeWidth] = useState<number>(1);
    const [isModalVisible, setisModalVisible] = useState<boolean>(false);
    const [isFilterOpen, setisFilterOpen] = useState<boolean>(false);


    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen); // Toggle modal open/close
    };


    // تابع تشخیص سایز صفحه برای تنظیم مقدار اولیه فیلتر
    const handleResize = () => {
        if (window.innerWidth < 1200) {
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

    const SwitchModal = () => {
        setisModalVisible(prevState => !prevState);
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
                <OrIconHeader 
                onSearch={handleSearch}
                toggleFilter={toggleFilter}
                isFilterVisible={isFilterVisible}
                switchModal={SwitchModal}
                isModalrVisible={isModalVisible}
                filterOpen={isFilterVisible}
              
                 />

                <Modal
                isOpen={isModalVisible}
                onClose={SwitchModal}
                title='Download'
                dis='Choose your preferred version.'
                >  
                {/* <div className='download-box'>
                        <div className='box-wrapper'>
                            <div className='modal-item-icon'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.5 22C10.432 22 12 20.5067 12 18.6667V15.3333H8.5C6.568 15.3333 5 16.8267 5 18.6667C5 20.5067 6.568 22 8.5 22Z" fill="#0ACF83"/>
                                    <path d="M5 12C5 10.16 6.568 8.66667 8.5 8.66667H12V15.3333H8.5C6.568 15.3333 5 13.84 5 12Z" fill="#A259FF"/>
                                    <path d="M5 5.33333C5 3.49333 6.568 2 8.5 2H12V8.66667H8.5C6.568 8.66667 5 7.17333 5 5.33333Z" fill="#F24E1E"/>
                                    <path d="M12 2H15.5C17.432 2 19 3.49333 19 5.33333C19 7.17333 17.432 8.66667 15.5 8.66667H12V2Z" fill="#FF7262"/>
                                    <path d="M19 12C19 13.84 17.432 15.3333 15.5 15.3333C13.568 15.3333 12 13.84 12 12C12 10.16 13.568 8.66667 15.5 8.66667C17.432 8.66667 19 10.16 19 12Z" fill="#1ABCFE"/>
                                </svg>
                            </div>
                                <div className='title-wrapper'>
                                    <span className='b1-strong'>
                                        Figma comunity
                                    </span>
                                    <span className='b1'>
                                        dis
                                    </span>
                                </div>
                        </div>

                        <OrButton
                            appearance='outline'
                            variant='secondary'
                            layout='icon-text'
                            icon={<Icon.externalLink/>}
                            text='Open'
                            onClick={SwitchModal}
                        />
                    </div>

                    <div className='download-box'>
                        <div className='box-wrapper'>
                            <div className='modal-item-icon'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.5 22C10.432 22 12 20.5067 12 18.6667V15.3333H8.5C6.568 15.3333 5 16.8267 5 18.6667C5 20.5067 6.568 22 8.5 22Z" fill="#0ACF83"/>
                                    <path d="M5 12C5 10.16 6.568 8.66667 8.5 8.66667H12V15.3333H8.5C6.568 15.3333 5 13.84 5 12Z" fill="#A259FF"/>
                                    <path d="M5 5.33333C5 3.49333 6.568 2 8.5 2H12V8.66667H8.5C6.568 8.66667 5 7.17333 5 5.33333Z" fill="#F24E1E"/>
                                    <path d="M12 2H15.5C17.432 2 19 3.49333 19 5.33333C19 7.17333 17.432 8.66667 15.5 8.66667H12V2Z" fill="#FF7262"/>
                                    <path d="M19 12C19 13.84 17.432 15.3333 15.5 15.3333C13.568 15.3333 12 13.84 12 12C12 10.16 13.568 8.66667 15.5 8.66667C17.432 8.66667 19 10.16 19 12Z" fill="#1ABCFE"/>
                                </svg>
                            </div>
                                <div className='title-wrapper'>
                                    <span className='b1-strong'>
                                        Figma File
                                    </span>
                                    <span className='b1'>
                                        dis
                                    </span>
                                </div>
                        </div>

                        <OrButton
                            appearance='outline'
                            variant='secondary'
                            layout='icon-text'
                            text='Download'
                            icon={<Icon.download/>}
                            onClick={SwitchModal}
                        />
                    </div>

                    <div className='download-box'>
                        <div className='box-wrapper'>
                            <div className='modal-item-icon'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 12C3.72386 12 3.5 12.2239 3.5 12.5C3.5 12.7761 3.72386 13 4 13H5.19098L3.55279 16.2764C3.47529 16.4314 3.48357 16.6155 3.57468 16.7629C3.66578 16.9103 3.82671 17 4 17H6C6.27614 17 6.5 16.7761 6.5 16.5C6.5 16.2239 6.27614 16 6 16H4.80902L6.44721 12.7236C6.52471 12.5686 6.51643 12.3845 6.42533 12.2371C6.33422 12.0897 6.17329 12 6 12H4Z" fill="black"/>
                                <path d="M8.5 12.5C8.5 12.2239 8.27614 12 8 12C7.72386 12 7.5 12.2239 7.5 12.5V16.5C7.5 16.7761 7.72386 17 8 17C8.27614 17 8.5 16.7761 8.5 16.5V12.5Z" fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 12C9.72386 12 9.5 12.2239 9.5 12.5V16.5C9.5 16.7761 9.72386 17 10 17C10.2761 17 10.5 16.7761 10.5 16.5V15.5H11.5C12.3284 15.5 13 14.8284 13 14V13.5C13 12.6716 12.3284 12 11.5 12H10ZM11.5 14.5H10.5V13H11.5C11.7761 13 12 13.2239 12 13.5V14C12 14.2761 11.7761 14.5 11.5 14.5Z" fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 1.25C4.98122 1.25 3.75 2.48122 3.75 4V9.25H3.5C1.98122 9.25 0.75 10.4812 0.75 12V17C0.75 18.5188 1.98122 19.75 3.5 19.75H3.75V20C3.75 21.5188 4.98122 22.75 6.5 22.75H17.5C19.0188 22.75 20.25 21.5188 20.25 20V7.70156C20.25 7.64451 20.2482 7.58762 20.2447 7.53096C20.2482 7.48427 20.25 7.43711 20.25 7.38953C20.25 6.96707 20.1062 6.55719 19.8423 6.22731L16.3898 1.91169C16.0552 1.49346 15.5487 1.25 15.0131 1.25C14.9415 1.25 14.8709 1.25427 14.8015 1.26257C14.7146 1.25423 14.6269 1.25 14.5388 1.25H6.5ZM18.7333 7.49816C18.6987 7.28831 18.6109 7.08957 18.4768 6.92162L18.4761 6.92069L15.5148 3.21913C15.3478 3.01055 15.1199 2.86279 14.8674 2.79397C14.7966 2.84112 14.75 2.92166 14.75 3.01309V6.5C14.75 7.19036 15.3096 7.75 16 7.75H18.3895C18.5508 7.75 18.6873 7.64416 18.7333 7.49816ZM13.25 3.01309C13.25 2.92368 13.2567 2.83583 13.2695 2.75H6.5C5.80964 2.75 5.25 3.30964 5.25 4V9.25H13C14.5188 9.25 15.75 10.4812 15.75 12V17C15.75 18.5188 14.5188 19.75 13 19.75H5.25V20C5.25 20.6904 5.80964 21.25 6.5 21.25H17.5C18.1904 21.25 18.75 20.6904 18.75 20V9.2151C18.6334 9.238 18.5129 9.25 18.3895 9.25H16C14.4812 9.25 13.25 8.01878 13.25 6.5V3.01309ZM2.25 12C2.25 11.3096 2.80964 10.75 3.5 10.75H13C13.6904 10.75 14.25 11.3096 14.25 12V17C14.25 17.6904 13.6904 18.25 13 18.25H3.5C2.80964 18.25 2.25 17.6904 2.25 17V12Z" fill="black"/>
                            </svg>

                            </div>
                                <div className='title-wrapper'>
                                    <span className='b1-strong'>
                                        Zip file
                                    </span>
                                    <span className='b1'>
                                        dis
                                    </span>
                                </div>
                        </div>

                        <OrButton
                            appearance='outline'
                            variant='secondary'
                            layout='icon-text'
                            text='Download'
                            icon={<Icon.download/>}
                            onClick={SwitchModal}
                        />
                    </div>
                    <div className='download-box'>
                        <div className='box-wrapper'>
                            <div className='modal-item-icon'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 12C3.72386 12 3.5 12.2239 3.5 12.5C3.5 12.7761 3.72386 13 4 13H5.19098L3.55279 16.2764C3.47529 16.4314 3.48357 16.6155 3.57468 16.7629C3.66578 16.9103 3.82671 17 4 17H6C6.27614 17 6.5 16.7761 6.5 16.5C6.5 16.2239 6.27614 16 6 16H4.80902L6.44721 12.7236C6.52471 12.5686 6.51643 12.3845 6.42533 12.2371C6.33422 12.0897 6.17329 12 6 12H4Z" fill="black"/>
                                <path d="M8.5 12.5C8.5 12.2239 8.27614 12 8 12C7.72386 12 7.5 12.2239 7.5 12.5V16.5C7.5 16.7761 7.72386 17 8 17C8.27614 17 8.5 16.7761 8.5 16.5V12.5Z" fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 12C9.72386 12 9.5 12.2239 9.5 12.5V16.5C9.5 16.7761 9.72386 17 10 17C10.2761 17 10.5 16.7761 10.5 16.5V15.5H11.5C12.3284 15.5 13 14.8284 13 14V13.5C13 12.6716 12.3284 12 11.5 12H10ZM11.5 14.5H10.5V13H11.5C11.7761 13 12 13.2239 12 13.5V14C12 14.2761 11.7761 14.5 11.5 14.5Z" fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 1.25C4.98122 1.25 3.75 2.48122 3.75 4V9.25H3.5C1.98122 9.25 0.75 10.4812 0.75 12V17C0.75 18.5188 1.98122 19.75 3.5 19.75H3.75V20C3.75 21.5188 4.98122 22.75 6.5 22.75H17.5C19.0188 22.75 20.25 21.5188 20.25 20V7.70156C20.25 7.64451 20.2482 7.58762 20.2447 7.53096C20.2482 7.48427 20.25 7.43711 20.25 7.38953C20.25 6.96707 20.1062 6.55719 19.8423 6.22731L16.3898 1.91169C16.0552 1.49346 15.5487 1.25 15.0131 1.25C14.9415 1.25 14.8709 1.25427 14.8015 1.26257C14.7146 1.25423 14.6269 1.25 14.5388 1.25H6.5ZM18.7333 7.49816C18.6987 7.28831 18.6109 7.08957 18.4768 6.92162L18.4761 6.92069L15.5148 3.21913C15.3478 3.01055 15.1199 2.86279 14.8674 2.79397C14.7966 2.84112 14.75 2.92166 14.75 3.01309V6.5C14.75 7.19036 15.3096 7.75 16 7.75H18.3895C18.5508 7.75 18.6873 7.64416 18.7333 7.49816ZM13.25 3.01309C13.25 2.92368 13.2567 2.83583 13.2695 2.75H6.5C5.80964 2.75 5.25 3.30964 5.25 4V9.25H13C14.5188 9.25 15.75 10.4812 15.75 12V17C15.75 18.5188 14.5188 19.75 13 19.75H5.25V20C5.25 20.6904 5.80964 21.25 6.5 21.25H17.5C18.1904 21.25 18.75 20.6904 18.75 20V9.2151C18.6334 9.238 18.5129 9.25 18.3895 9.25H16C14.4812 9.25 13.25 8.01878 13.25 6.5V3.01309ZM2.25 12C2.25 11.3096 2.80964 10.75 3.5 10.75H13C13.6904 10.75 14.25 11.3096 14.25 12V17C14.25 17.6904 13.6904 18.25 13 18.25H3.5C2.80964 18.25 2.25 17.6904 2.25 17V12Z" fill="black"/>
                            </svg>

                            </div>
                                <div className='title-wrapper'>
                                    <span className='b1-strong'>
                                        Font icon
                                    </span>
                                    <span className='b1'>
                                        dis
                                    </span>
                                </div>
                        </div>

                        <OrButton
                            appearance='outline'
                            variant='secondary'
                            layout='icon-text'
                            text='Download'
                            icon={<Icon.download/>}
                            onClick={SwitchModal}
                        />
                    </div> */}
                    <div className='download-box'>
                        <div className='box-wrapper'>
                            
                                <div className='title-wrapper'>
                                    <span className='b1-strong'>
                                    In the beta version, it is not possible to download all icons.
                                    </span>
                                    <span className='b1'>
                                    We'll be back in the original version.
                                    </span>
                                </div>
                        </div>

                        
                    </div>
                   
                 </Modal>
            

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
