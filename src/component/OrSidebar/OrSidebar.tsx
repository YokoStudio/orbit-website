import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./OrSidebar.scss";


interface OrSidebarProps {
    handleMenuToggle: () => void; // تعریف نوع پراپرتی handleMenuToggle
  }

  const OrSidebar: React.FC<OrSidebarProps> = ({handleMenuToggle  }) => {

    const location = useLocation();
    const navigate = useNavigate();
  
    // State to track the active path
    const [activePath, setActivePath] = useState<string>('');
  
    // Update the active path whenever the location changes
    useEffect(() => {
      // Normalize the active path to handle default redirection
      const normalizedPath = location.pathname === '/' ? '/icons' : location.pathname;
      setActivePath(normalizedPath);
    }, [location]);
  
    // Handle navigation and update the active path manually
    const handleNavigation = (path: string) => {
      navigate(path);
      setActivePath(path); // Ensure the active state updates immediately
    };
  
    // Helper function to check if a path is active
    const isActive = (path: string) => activePath === path;
    
  return (
    <div className="OrSidebar-desktop">
       
      <div className="sidebar-poduct-content">

      <button 
          className="sidebar-button" 
          onClick={() => navigate('/home')}
        >
          <div className={`icon-wrapper ${isActive('/home') ? 'active' : ''}`}>
            {isActive('/home') ? (
              // Active Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.67236 2.88614C11.0363 1.80637 12.9637 1.80637 14.3276 2.88614L20.3276 7.63614C21.2261 8.3474 21.75 9.43041 21.75 10.5763V18C21.75 20.0711 20.0711 21.75 18 21.75H6C3.92893 21.75 2.25 20.0711 2.25 18V10.5763C2.25 9.43041 2.77393 8.3474 3.67236 7.63614L9.67236 2.88614ZM9 18.25C8.58579 18.25 8.25 18.5858 8.25 19C8.25 19.4142 8.58579 19.75 9 19.75H15C15.4142 19.75 15.75 19.4142 15.75 19C15.75 18.5858 15.4142 18.25 15 18.25H9Z" fill="black"/>
              </svg>
            ) : (
              // Not Active Icon
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M14.3276 2.88614C12.9637 1.80637 11.0363 1.80637 9.67236 2.88614L3.67236 7.63614C2.77393 8.3474 2.25 9.43041 2.25 10.5763V18C2.25 20.0711 3.92893 21.75 6 21.75H18C20.0711 21.75 21.75 20.0711 21.75 18V10.5763C21.75 9.43041 21.2261 8.3474 20.3276 7.63614L14.3276 2.88614ZM10.6034 4.06221C11.4218 3.41434 12.5782 3.41434 13.3966 4.06221L19.3966 8.8122C19.9356 9.23896 20.25 9.88877 20.25 10.5763V18C20.25 19.2426 19.2426 20.25 18 20.25H6C4.75736 20.25 3.75 19.2426 3.75 18V10.5763C3.75 9.88877 4.06436 9.23896 4.60342 8.81221L10.6034 4.06221Z" fill="black"/>
              </svg>
            )}
          </div>
          <span className="c1 icon-button-label">Home</span>
        </button>

        <button 
          className="sidebar-button" 
          onClick={() => navigate('/icons')}
        >
          <div className={`icon-wrapper ${isActive('/icons') ? 'active' : ''}`}>
            {isActive('/icons') ? (
              // Active Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.6444 3.308C12.9776 1.89733 11.0225 1.89734 10.3557 3.308L8.40774 7.42926C8.35221 7.54675 8.2546 7.61098 8.16154 7.6251L3.8126 8.28492C2.27443 8.5183 1.75628 10.4261 2.7934 11.4816L5.93498 14.6791C6.01819 14.7637 6.06403 14.8967 6.04139 15.0346L5.29903 19.5538C5.0596 21.0114 6.55152 22.3008 7.96298 21.526L11.8607 19.3864C11.9492 19.3378 12.0509 19.3378 12.1394 19.3864L16.0371 21.526C17.4486 22.3008 18.9405 21.0114 18.7011 19.5538L17.9587 15.0346C17.9361 14.8967 17.9819 14.7637 18.0651 14.6791L21.2067 11.4816C22.2438 10.4261 21.7257 8.5183 20.1875 8.28492L15.8386 7.6251C15.7455 7.61098 15.6479 7.54675 15.5924 7.42926L13.6444 3.308Z" fill="black" />
                </svg>
            ) : (
              // Not Active Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.3557 3.308C11.0225 1.89734 12.9776 1.89733 13.6444 3.308L15.5924 7.42926C15.6479 7.54675 15.7455 7.61098 15.8386 7.6251L20.1875 8.28492C21.7257 8.5183 22.2438 10.4261 21.2067 11.4816L18.0651 14.6791C17.9819 14.7637 17.9361 14.8967 17.9587 15.0346L18.7011 19.5538C18.9405 21.0114 17.4486 22.3008 16.0371 21.526L12.1394 19.3864C12.0509 19.3378 11.9492 19.3378 11.8607 19.3864L7.96298 21.526C6.55152 22.3008 5.0596 21.0114 5.29903 19.5538L6.04139 15.0346C6.06403 14.8967 6.01819 14.7637 5.93498 14.6791L2.7934 11.4816C1.75628 10.4261 2.27443 8.5183 3.8126 8.28492L8.16154 7.6251C8.2546 7.61098 8.35221 7.54675 8.40774 7.42926L10.3557 3.308ZM12.0001 3.75C11.8951 3.75 11.7814 3.80202 11.7119 3.94901L9.76388 8.07027C9.50462 8.61877 8.99524 9.01578 8.38655 9.10813L4.0376 9.76795C3.91793 9.78611 3.8163 9.8694 3.77031 10.0181C3.72397 10.168 3.75631 10.3214 3.86337 10.4304L7.00494 13.6278C7.43241 14.0628 7.61969 14.6803 7.52155 15.2777L6.7792 19.797C6.7505 19.9717 6.82087 20.1075 6.92208 20.1847C7.02007 20.2595 7.13026 20.2719 7.24118 20.211L11.1389 18.0715C11.677 17.7761 12.3231 17.7761 12.8612 18.0715L16.7589 20.211C16.8699 20.2719 16.98 20.2595 17.078 20.1847C17.1793 20.1075 17.2496 19.9717 17.2209 19.797L16.4786 15.2777C16.3804 14.6803 16.5677 14.0628 16.9952 13.6278L20.1368 10.4304C20.2438 10.3214 20.2762 10.168 20.2298 10.0181C20.1838 9.8694 20.0822 9.78611 19.9625 9.76795L15.6136 9.10813C15.0049 9.01578 14.4955 8.61877 14.2362 8.07027L12.2882 3.94901C12.2188 3.80202 12.1051 3.75 12.0001 3.75Z"
                    fill="black"
                    />
                </svg>
            )}
          </div>
          <span className="b2 icon-button-label">Icons</span>
        </button>

        <button 
          className="sidebar-button" 
          onClick={() => navigate('/changelog')}
        >
          <div className={`icon-wrapper ${isActive('/changelog') ? 'active' : ''}`}>
            {isActive('/changelog') ? (
              // Active Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0131 2.75C14.8678 2.75 14.75 2.86779 14.75 3.01309V6.5C14.75 7.19036 15.3096 7.75 16 7.75H18.3895C18.5886 7.75 18.75 7.58861 18.75 7.38953C18.75 7.30768 18.7221 7.22826 18.671 7.16435L15.2185 2.84874C15.1686 2.78633 15.093 2.75 15.0131 2.75ZM13.25 3.01309C13.25 2.03936 14.0394 1.25 15.0131 1.25C15.5487 1.25 16.0552 1.49346 16.3898 1.91169L19.8423 6.22731C20.1062 6.55719 20.25 6.96707 20.25 7.38953C20.25 8.41704 19.417 9.25 18.3895 9.25H16C14.4812 9.25 13.25 8.01878 13.25 6.5V3.01309Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 4C3.75 2.48122 4.98122 1.25 6.5 1.25H14.5388C15.3742 1.25 16.1643 1.62975 16.6861 2.28209L19.6474 5.98365C20.0375 6.47126 20.25 7.07712 20.25 7.70156V20C20.25 21.5188 19.0188 22.75 17.5 22.75H6.5C4.98122 22.75 3.75 21.5188 3.75 20V4ZM14 3.01309V6.5C14 7.60457 14.8954 8.5 16 8.5H18.3895C19.0028 8.5 19.5 8.00283 19.5 7.38953C19.5 7.13738 19.4142 6.89273 19.2567 6.69583L15.8042 2.38022C15.6119 2.1399 15.3208 2 15.0131 2C14.4536 2 14 2.45357 14 3.01309ZM7.25 14C7.25 13.5858 7.58579 13.25 8 13.25H14C14.4142 13.25 14.75 13.5858 14.75 14C14.75 14.4142 14.4142 14.75 14 14.75H8C7.58579 14.75 7.25 14.4142 7.25 14ZM8 16.25C7.58579 16.25 7.25 16.5858 7.25 17C7.25 17.4142 7.58579 17.75 8 17.75H16C16.4142 17.75 16.75 17.4142 16.75 17C16.75 16.5858 16.4142 16.25 16 16.25H8Z" fill="black"/>
                </svg>
            ) : (
              // Not Active Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H14C14.4142 14.75 14.75 14.4142 14.75 14C14.75 13.5858 14.4142 13.25 14 13.25H8Z" fill="black"/>
                    <path d="M8 16.25C7.58579 16.25 7.25 16.5858 7.25 17C7.25 17.4142 7.58579 17.75 8 17.75H16C16.4142 17.75 16.75 17.4142 16.75 17C16.75 16.5858 16.4142 16.25 16 16.25H8Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8015 1.26257C14.7146 1.25423 14.6269 1.25 14.5388 1.25H6.5C4.98122 1.25 3.75 2.48122 3.75 4V20C3.75 21.5188 4.98122 22.75 6.5 22.75H17.5C19.0188 22.75 20.25 21.5188 20.25 20V7.70156C20.25 7.64451 20.2482 7.58762 20.2447 7.53096C20.2482 7.48427 20.25 7.43711 20.25 7.38953C20.25 6.96707 20.1062 6.55719 19.8423 6.22731L16.3898 1.91169C16.0552 1.49346 15.5487 1.25 15.0131 1.25C14.9415 1.25 14.8709 1.25427 14.8015 1.26257ZM6.5 2.75C5.80964 2.75 5.25 3.30964 5.25 4V20C5.25 20.6904 5.80964 21.25 6.5 21.25H17.5C18.1904 21.25 18.75 20.6904 18.75 20V9.21511C18.6334 9.238 18.5129 9.25 18.3895 9.25H16C14.4812 9.25 13.25 8.01878 13.25 6.5V3.01309C13.25 2.92368 13.2567 2.83583 13.2695 2.75H6.5ZM14.8674 2.79397C14.7966 2.84112 14.75 2.92166 14.75 3.01309V6.5C14.75 7.19036 15.3096 7.75 16 7.75H18.3895C18.5508 7.75 18.6873 7.64416 18.7333 7.49816C18.6987 7.28792 18.6106 7.08884 18.4761 6.92069L15.5148 3.21913C15.5147 3.21897 15.515 3.21929 15.5148 3.21913C15.3478 3.0105 15.1199 2.8628 14.8674 2.79397Z" fill="black"/>
                </svg>
            )}
          </div>
          <span className="c1 icon-button-label">Changelog</span>
        </button>

        <button 
          className="sidebar-button" 
          onClick={() => navigate('/about')}
        >
          <div className={`icon-wrapper ${isActive('/about') ? 'active' : ''}`}>
            {isActive('/about') ? (
              // Active Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM11.9565 7.04919C10.7379 7.04919 9.75 8.03709 9.75 9.25572C9.75 9.66993 9.41421 10.0057 9 10.0057C8.58579 10.0057 8.25 9.66993 8.25 9.25572C8.25 7.20866 9.90947 5.54919 11.9565 5.54919C14.0036 5.54919 15.663 7.20866 15.663 9.25572C15.663 10.611 14.9352 11.7956 13.8526 12.4411C13.5161 12.6417 13.2135 12.8735 13.0023 13.1227C12.7942 13.3682 12.7065 13.5909 12.7065 13.7992C12.7065 14.2134 12.3707 14.5492 11.9565 14.5492C11.5423 14.5492 11.2065 14.2134 11.2065 13.7992C11.2065 13.1311 11.4984 12.577 11.8581 12.1527C12.2147 11.732 12.6681 11.4009 13.0844 11.1527C13.732 10.7666 14.163 10.0611 14.163 9.25572C14.163 8.03709 13.1751 7.04919 11.9565 7.04919ZM11 17.2992C11 16.7469 11.4477 16.2992 12 16.2992C12.5523 16.2992 13 16.7469 13 17.2992C13 17.8515 12.5523 18.2992 12 18.2992C11.4477 18.2992 11 17.8515 11 17.2992Z" fill="black"/>
              </svg>

            ) : (
              // Not Active Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z" fill="black"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9565 7.04922C10.7379 7.04922 9.75 8.03712 9.75 9.25575C9.75 9.66996 9.41421 10.0057 9 10.0057C8.58579 10.0057 8.25 9.66996 8.25 9.25575C8.25 7.20869 9.90947 5.54922 11.9565 5.54922C14.0036 5.54922 15.663 7.20869 15.663 9.25575C15.663 10.6111 14.9352 11.7956 13.8526 12.4411C13.5161 12.6418 13.2135 12.8736 13.0023 13.1227C12.7942 13.3682 12.7065 13.5909 12.7065 13.7992C12.7065 14.2134 12.3707 14.5492 11.9565 14.5492C11.5423 14.5492 11.2065 14.2134 11.2065 13.7992C11.2065 13.1311 11.4984 12.5771 11.8581 12.1528C12.2147 11.7321 12.6681 11.401 13.0844 11.1528C13.732 10.7666 14.163 10.0611 14.163 9.25575C14.163 8.03712 13.1752 7.04922 11.9565 7.04922Z" fill="black"/>
              <path d="M11 17.2992C11 16.7469 11.4477 16.2992 12 16.2992C12.5523 16.2992 13 16.7469 13 17.2992C13 17.8515 12.5523 18.2992 12 18.2992C11.4477 18.2992 11 17.8515 11 17.2992Z" fill="black"/>
              </svg>

            )}
          </div>
          <span className="c1 icon-button-label">About</span>
        </button>
        <button  className='sidebar-button' id='navigation-more-button' onClick={() => handleMenuToggle()}>
          <div className={`icon-wrapper`} >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C11.8619 2.75 11.75 2.86193 11.75 3C11.75 3.13807 11.8619 3.25 12 3.25C12.1381 3.25 12.25 3.13807 12.25 3C12.25 2.86193 12.1381 2.75 12 2.75ZM10.25 3C10.25 2.0335 11.0335 1.25 12 1.25C12.9665 1.25 13.75 2.0335 13.75 3C13.75 3.9665 12.9665 4.75 12 4.75C11.0335 4.75 10.25 3.9665 10.25 3Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 20.75C11.8619 20.75 11.75 20.8619 11.75 21C11.75 21.1381 11.8619 21.25 12 21.25C12.1381 21.25 12.25 21.1381 12.25 21C12.25 20.8619 12.1381 20.75 12 20.75ZM10.25 21C10.25 20.0335 11.0335 19.25 12 19.25C12.9665 19.25 13.75 20.0335 13.75 21C13.75 21.9665 12.9665 22.75 12 22.75C11.0335 22.75 10.25 21.9665 10.25 21Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 11.75C11.8619 11.75 11.75 11.8619 11.75 12C11.75 12.1381 11.8619 12.25 12 12.25C12.1381 12.25 12.25 12.1381 12.25 12C12.25 11.8619 12.1381 11.75 12 11.75ZM10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12C13.75 12.9665 12.9665 13.75 12 13.75C11.0335 13.75 10.25 12.9665 10.25 12Z" fill="black"/>
          </svg>



           </div>
           <span className='b2 icon-button-label'>
                More
             </span>
       </button>
      </div>

      <div className="sidebar-main-content">
      <button 
      className={`sidebar-button`}
      onClick={() => window.open('https://yoko.studio/contact-us/', '_blank', 'noopener,noreferrer')} 
      >
        
            <div className='icon-wrapper'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.25205 9.82013C3.03174 10.1012 2.12183 11.1943 2.12183 12.5V14.5C2.12183 16.0188 3.35304 17.25 4.87183 17.25C6.39061 17.25 7.62183 16.0188 7.62183 14.5V12.5C7.62183 11.2886 6.83858 10.2602 5.75089 9.8935C5.80774 6.49085 8.58379 3.75 12 3.75C15.4404 3.75 18.2315 6.52972 18.2499 9.96574C17.2624 10.383 16.5695 11.3606 16.5695 12.5V14.5C16.5695 15.8235 17.5045 16.9287 18.75 17.191V17.5C18.75 18.7426 17.7426 19.75 16.5 19.75H15.0816C14.8007 19.1588 14.1981 18.75 13.5 18.75H12.5C11.5335 18.75 10.75 19.5335 10.75 20.5C10.75 21.4665 11.5335 22.25 12.5 22.25H13.5C14.1981 22.25 14.8007 21.8412 15.0816 21.25H16.5C18.5711 21.25 20.25 19.5711 20.25 17.5V17.0886C21.3108 16.7072 22.0695 15.6922 22.0695 14.5V12.5C22.0695 11.1267 21.0627 9.98843 19.747 9.78304C19.6321 5.60315 16.2076 2.25 12 2.25C7.77991 2.25 4.34763 5.623 4.25205 9.82013ZM13.75 20.5C13.75 20.3619 13.6381 20.25 13.5 20.25H12.5C12.3619 20.25 12.25 20.3619 12.25 20.5C12.25 20.6381 12.3619 20.75 12.5 20.75H13.5C13.6381 20.75 13.75 20.6381 13.75 20.5ZM19.3195 11.25C18.6291 11.25 18.0695 11.8096 18.0695 12.5V14.5C18.0695 15.1904 18.6291 15.75 19.3195 15.75C20.0098 15.75 20.5695 15.1904 20.5695 14.5V12.5C20.5695 11.8096 20.0098 11.25 19.3195 11.25ZM3.62183 14.5C3.62183 15.1904 4.18147 15.75 4.87183 15.75C5.56218 15.75 6.12183 15.1904 6.12183 14.5V12.5C6.12183 11.8096 5.56218 11.25 4.87183 11.25C4.18147 11.25 3.62183 11.8096 3.62183 12.5V14.5Z" fill="black"/>
            </svg>

            </div>
            <span className='c1 icon-button-label'>
            Contact us
            </span>
            
        </button>

        <button
        className={`sidebar-button`}
        onClick={() => window.open('https://yoko.studio', '_blank', 'noopener,noreferrer')} 
        >
            <div className='icon-wrapper'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.9987 5L7.99532 15V19H11.9967L22 9V5H17.9987Z" fill="black"/>
                    <path d="M6.00172 5.00691L2.00031 9.00699L6.00172 13.0071L10.0031 9.00699L6.00172 5.00691Z" fill="black"/>
                </svg>
            </div>
            
            <span className='c1 icon-button-label'>
              Yoko
            </span>
        </button>
       
       

        


      </div>

    </div>
  );
};

export default OrSidebar;
