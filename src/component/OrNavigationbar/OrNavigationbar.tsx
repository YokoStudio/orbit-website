import React from 'react';
import "./OrNavigationbar.scss"
import YokoLogo from '../../assets/Sign-logo-04.jpg';

interface OrSidebarProps {
  setActivePage: (page: string) => void; // تعریف نوع پراپرتی setActivePage
  activePage: string;
}

const OrSidebar: React.FC<OrSidebarProps> = ({ setActivePage, activePage  }) => {
  return (
    <div className="OrNavigationbar">
       
      <div className="nav-poduct-content">

        <button className='nav-button' onClick={() => setActivePage('Home')}>
        <div className={`icon-wrapper ${activePage === 'Home' ? 'active' : ''}`} >
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3276 2.88614C12.9637 1.80637 11.0363 1.80637 9.67236 2.88614L3.67236 7.63614C2.77393 8.3474 2.25 9.43041 2.25 10.5763V18C2.25 20.0711 3.92893 21.75 6 21.75H18C20.0711 21.75 21.75 20.0711 21.75 18V10.5763C21.75 9.43041 21.2261 8.3474 20.3276 7.63614L14.3276 2.88614ZM10.6034 4.06221C11.4218 3.41434 12.5782 3.41434 13.3966 4.06221L19.3966 8.8122C19.9356 9.23896 20.25 9.88877 20.25 10.5763V18C20.25 19.2426 19.2426 20.25 18 20.25H6C4.75736 20.25 3.75 19.2426 3.75 18V10.5763C3.75 9.88877 4.06436 9.23896 4.60342 8.81221L10.6034 4.06221Z" fill="black"/>
                </svg>
            </div>
            <span className='b2.strong'>
                Home
            </span>
        </button>


        <button className='nav-button'onClick={() => setActivePage('Changelog')}>
            <div className={`icon-wrapper ${activePage === 'Changelog' ? 'active' : ''}`} >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H14C14.4142 14.75 14.75 14.4142 14.75 14C14.75 13.5858 14.4142 13.25 14 13.25H8Z" fill="black"/>
                <path d="M8 16.25C7.58579 16.25 7.25 16.5858 7.25 17C7.25 17.4142 7.58579 17.75 8 17.75H16C16.4142 17.75 16.75 17.4142 16.75 17C16.75 16.5858 16.4142 16.25 16 16.25H8Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8015 1.26257C14.7146 1.25423 14.6269 1.25 14.5388 1.25H6.5C4.98122 1.25 3.75 2.48122 3.75 4V20C3.75 21.5188 4.98122 22.75 6.5 22.75H17.5C19.0188 22.75 20.25 21.5188 20.25 20V7.70156C20.25 7.64451 20.2482 7.58762 20.2447 7.53096C20.2482 7.48427 20.25 7.43711 20.25 7.38953C20.25 6.96707 20.1062 6.55719 19.8423 6.22731L16.3898 1.91169C16.0552 1.49346 15.5487 1.25 15.0131 1.25C14.9415 1.25 14.8709 1.25427 14.8015 1.26257ZM6.5 2.75C5.80964 2.75 5.25 3.30964 5.25 4V20C5.25 20.6904 5.80964 21.25 6.5 21.25H17.5C18.1904 21.25 18.75 20.6904 18.75 20V9.21511C18.6334 9.238 18.5129 9.25 18.3895 9.25H16C14.4812 9.25 13.25 8.01878 13.25 6.5V3.01309C13.25 2.92368 13.2567 2.83583 13.2695 2.75H6.5ZM14.8674 2.79397C14.7966 2.84112 14.75 2.92166 14.75 3.01309V6.5C14.75 7.19036 15.3096 7.75 16 7.75H18.3895C18.5508 7.75 18.6873 7.64416 18.7333 7.49816C18.6987 7.28792 18.6106 7.08884 18.4761 6.92069L15.5148 3.21913C15.5147 3.21897 15.515 3.21929 15.5148 3.21913C15.3478 3.0105 15.1199 2.8628 14.8674 2.79397Z" fill="black"/>
            </svg>
            </div>
            <span className='b2.strong'>
                Changelog
            </span>
        </button>

        <button className='nav-button' onClick={() => setActivePage('Icons')}>
            <div className={`icon-wrapper ${activePage === 'Icons' ? 'active' : ''}`} >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3557 3.308C11.0225 1.89734 12.9776 1.89733 13.6444 3.308L15.5924 7.42926C15.6479 7.54675 15.7455 7.61098 15.8386 7.6251L20.1875 8.28492C21.7257 8.5183 22.2438 10.4261 21.2067 11.4816L18.0651 14.6791C17.9819 14.7637 17.9361 14.8967 17.9587 15.0346L18.7011 19.5538C18.9405 21.0114 17.4486 22.3008 16.0371 21.526L12.1394 19.3864C12.0509 19.3378 11.9492 19.3378 11.8607 19.3864L7.96298 21.526C6.55152 22.3008 5.0596 21.0114 5.29903 19.5538L6.04139 15.0346C6.06403 14.8967 6.01819 14.7637 5.93498 14.6791L2.7934 11.4816C1.75628 10.4261 2.27443 8.5183 3.8126 8.28492L8.16154 7.6251C8.2546 7.61098 8.35221 7.54675 8.40774 7.42926L10.3557 3.308ZM12.0001 3.75C11.8951 3.75 11.7814 3.80202 11.7119 3.94901L9.76388 8.07027C9.50462 8.61877 8.99524 9.01578 8.38655 9.10813L4.0376 9.76795C3.91793 9.78611 3.8163 9.8694 3.77031 10.0181C3.72397 10.168 3.75631 10.3214 3.86337 10.4304L7.00494 13.6278C7.43241 14.0628 7.61969 14.6803 7.52155 15.2777L6.7792 19.797C6.7505 19.9717 6.82087 20.1075 6.92208 20.1847C7.02007 20.2595 7.13026 20.2719 7.24118 20.211L11.1389 18.0715C11.677 17.7761 12.3231 17.7761 12.8612 18.0715L16.7589 20.211C16.8699 20.2719 16.98 20.2595 17.078 20.1847C17.1793 20.1075 17.2496 19.9717 17.2209 19.797L16.4786 15.2777C16.3804 14.6803 16.5677 14.0628 16.9952 13.6278L20.1368 10.4304C20.2438 10.3214 20.2762 10.168 20.2298 10.0181C20.1838 9.8694 20.0822 9.78611 19.9625 9.76795L15.6136 9.10813C15.0049 9.01578 14.4955 8.61877 14.2362 8.07027L12.2882 3.94901C12.2188 3.80202 12.1051 3.75 12.0001 3.75Z" fill="black"/>
                </svg>
            </div>
            <span className='b2.strong'>
              Icons
            </span>
        </button>
        

      </div>

      {/* <div className="sidebar-main-content">

      <button className={`sidebar-button ${activePage === 'Changelog' ? 'active' : ''}`} onClick={() => setActivePage('Icons')}>
            <div className='icon-wrapper'>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3276 2.88614C12.9637 1.80637 11.0363 1.80637 9.67236 2.88614L3.67236 7.63614C2.77393 8.3474 2.25 9.43041 2.25 10.5763V18C2.25 20.0711 3.92893 21.75 6 21.75H18C20.0711 21.75 21.75 20.0711 21.75 18V10.5763C21.75 9.43041 21.2261 8.3474 20.3276 7.63614L14.3276 2.88614ZM10.6034 4.06221C11.4218 3.41434 12.5782 3.41434 13.3966 4.06221L19.3966 8.8122C19.9356 9.23896 20.25 9.88877 20.25 10.5763V18C20.25 19.2426 19.2426 20.25 18 20.25H6C4.75736 20.25 3.75 19.2426 3.75 18V10.5763C3.75 9.88877 4.06436 9.23896 4.60342 8.81221L10.6034 4.06221Z" fill="black"/>
                </svg>
            </div>
            <span className='b2.strong'>
              Products
            </span>
        </button>

        <button className={`sidebar-button ${activePage === 'Changelog' ? 'active' : ''}`} onClick={() => setActivePage('Icons')}>
            <div className='icon-wrapper'>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3276 2.88614C12.9637 1.80637 11.0363 1.80637 9.67236 2.88614L3.67236 7.63614C2.77393 8.3474 2.25 9.43041 2.25 10.5763V18C2.25 20.0711 3.92893 21.75 6 21.75H18C20.0711 21.75 21.75 20.0711 21.75 18V10.5763C21.75 9.43041 21.2261 8.3474 20.3276 7.63614L14.3276 2.88614ZM10.6034 4.06221C11.4218 3.41434 12.5782 3.41434 13.3966 4.06221L19.3966 8.8122C19.9356 9.23896 20.25 9.88877 20.25 10.5763V18C20.25 19.2426 19.2426 20.25 18 20.25H6C4.75736 20.25 3.75 19.2426 3.75 18V10.5763C3.75 9.88877 4.06436 9.23896 4.60342 8.81221L10.6034 4.06221Z" fill="black"/>
                </svg>
            </div>
            <span className='b2.strong'>
                Blogs
            </span>
        </button>

        <button className={`sidebar-button ${activePage === 'Changelog' ? 'active' : ''}`} onClick={() => setActivePage('Icons')}>
            <div className='icon-wrapper'>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3276 2.88614C12.9637 1.80637 11.0363 1.80637 9.67236 2.88614L3.67236 7.63614C2.77393 8.3474 2.25 9.43041 2.25 10.5763V18C2.25 20.0711 3.92893 21.75 6 21.75H18C20.0711 21.75 21.75 20.0711 21.75 18V10.5763C21.75 9.43041 21.2261 8.3474 20.3276 7.63614L14.3276 2.88614ZM10.6034 4.06221C11.4218 3.41434 12.5782 3.41434 13.3966 4.06221L19.3966 8.8122C19.9356 9.23896 20.25 9.88877 20.25 10.5763V18C20.25 19.2426 19.2426 20.25 18 20.25H6C4.75736 20.25 3.75 19.2426 3.75 18V10.5763C3.75 9.88877 4.06436 9.23896 4.60342 8.81221L10.6034 4.06221Z" fill="black"/>
                </svg>
            </div>
            <span className='b2.strong'>
                Contact
            </span>
        </button>


      </div> */}

    </div>
  );
};

export default OrSidebar;
