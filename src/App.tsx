// import React, { useState } from 'react';
// import './App.scss';
// import OrSidebar from './component/OrSidebar/OrSidebar';
// import Home from './Page/Home/Home'; 
// import Icons from './Page/Icons/Icons'; // فراخوانی کامپوننت جدید Icons
// import Changelog from './Page/Changelog/Changelog';
// import About from './Page/About/About';
// import OrNavigationbar from './component/OrNavigationbar/OrNavigationbar';
// import OrMenu from './component/OrMenu/OrMenu';
// import Icon from './assets/Icon';

// const App: React.FC = () => {
//   const [activePage, setActivePage] = useState<string>('Icons'); // می‌توانید پیش‌فرض روی Icons تنظیم کنید
//   const [menuOpen, setMenuOpen] = useState(false); // ��یا منوی بالا با�� شود��

//   const listMenu = [
//     {
//       name: 'Contact',
//       link: 'https://yoko.studio',
//       icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path fill-rule="evenodd" clip-rule="evenodd" d="M4.25205 9.82013C3.03174 10.1012 2.12183 11.1943 2.12183 12.5V14.5C2.12183 16.0188 3.35304 17.25 4.87183 17.25C6.39061 17.25 7.62183 16.0188 7.62183 14.5V12.5C7.62183 11.2886 6.83858 10.2602 5.75089 9.8935C5.80774 6.49085 8.58379 3.75 12 3.75C15.4404 3.75 18.2315 6.52972 18.2499 9.96574C17.2624 10.383 16.5695 11.3606 16.5695 12.5V14.5C16.5695 15.8235 17.5045 16.9287 18.75 17.191V17.5C18.75 18.7426 17.7426 19.75 16.5 19.75H15.0816C14.8007 19.1588 14.1981 18.75 13.5 18.75H12.5C11.5335 18.75 10.75 19.5335 10.75 20.5C10.75 21.4665 11.5335 22.25 12.5 22.25H13.5C14.1981 22.25 14.8007 21.8412 15.0816 21.25H16.5C18.5711 21.25 20.25 19.5711 20.25 17.5V17.0886C21.3108 16.7072 22.0695 15.6922 22.0695 14.5V12.5C22.0695 11.1267 21.0627 9.98843 19.747 9.78304C19.6321 5.60315 16.2076 2.25 12 2.25C7.77991 2.25 4.34763 5.623 4.25205 9.82013ZM13.75 20.5C13.75 20.3619 13.6381 20.25 13.5 20.25H12.5C12.3619 20.25 12.25 20.3619 12.25 20.5C12.25 20.6381 12.3619 20.75 12.5 20.75H13.5C13.6381 20.75 13.75 20.6381 13.75 20.5ZM19.3195 11.25C18.6291 11.25 18.0695 11.8096 18.0695 12.5V14.5C18.0695 15.1904 18.6291 15.75 19.3195 15.75C20.0098 15.75 20.5695 15.1904 20.5695 14.5V12.5C20.5695 11.8096 20.0098 11.25 19.3195 11.25ZM3.62183 14.5C3.62183 15.1904 4.18147 15.75 4.87183 15.75C5.56218 15.75 6.12183 15.1904 6.12183 14.5V12.5C6.12183 11.8096 5.56218 11.25 4.87183 11.25C4.18147 11.25 3.62183 11.8096 3.62183 12.5V14.5Z" fill="black"/>
//       </svg>
//   },
//   {
//       name: 'Yoko.Studio',
//       link: 'https://yoko.studio',
//       icon: <Icon.cross/>
//   }

//   ]

//   const handleMenuToggle = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const renderPage = () => {
//     switch (activePage) {
//         case 'Home':
//             return <Home />;

//         case 'Icons':
//             return <Icons />;

//         case 'Changelog':
//             return <Changelog />;
      
//         case 'About':
//             return <About />;


//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <div className="app-container">
//       <OrSidebar setActivePage={setActivePage} activePage={activePage} />
//       <OrNavigationbar setActivePage={setActivePage} activePage={activePage} handleMenuToggle={handleMenuToggle}/>
//       <div className="main-content">
//       <OrMenu
//               itemMenu={listMenu}
//               isOpen={menuOpen}
//               handleToggle={handleMenuToggle}
             
//              />
//         {renderPage()} {/* محتوای اصلی */}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import './App.scss';
import OrSidebar from './component/OrSidebar/OrSidebar';
import Home from './Page/Home/Home'; 
import Icons from './Page/Icons/Icons'; // فراخوانی کامپوننت جدید Icons
import Changelog from './Page/Changelog/Changelog';
import About from './Page/About/About';

import OrMenu from './component/OrMenu/OrMenu';
import Icon from './assets/Icon';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('Icons'); // می‌توانید پیش‌فرض روی Icons تنظیم کنید
  const [menuOpen, setMenuOpen] = useState(false); // ��یا منوی بالا با�� شود��

  const listMenu = [
    {
      name: 'Contact Us',
      link: 'https://yoko.studio/contact-us/',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.25205 9.82013C3.03174 10.1012 2.12183 11.1943 2.12183 12.5V14.5C2.12183 16.0188 3.35304 17.25 4.87183 17.25C6.39061 17.25 7.62183 16.0188 7.62183 14.5V12.5C7.62183 11.2886 6.83858 10.2602 5.75089 9.8935C5.80774 6.49085 8.58379 3.75 12 3.75C15.4404 3.75 18.2315 6.52972 18.2499 9.96574C17.2624 10.383 16.5695 11.3606 16.5695 12.5V14.5C16.5695 15.8235 17.5045 16.9287 18.75 17.191V17.5C18.75 18.7426 17.7426 19.75 16.5 19.75H15.0816C14.8007 19.1588 14.1981 18.75 13.5 18.75H12.5C11.5335 18.75 10.75 19.5335 10.75 20.5C10.75 21.4665 11.5335 22.25 12.5 22.25H13.5C14.1981 22.25 14.8007 21.8412 15.0816 21.25H16.5C18.5711 21.25 20.25 19.5711 20.25 17.5V17.0886C21.3108 16.7072 22.0695 15.6922 22.0695 14.5V12.5C22.0695 11.1267 21.0627 9.98843 19.747 9.78304C19.6321 5.60315 16.2076 2.25 12 2.25C7.77991 2.25 4.34763 5.623 4.25205 9.82013ZM13.75 20.5C13.75 20.3619 13.6381 20.25 13.5 20.25H12.5C12.3619 20.25 12.25 20.3619 12.25 20.5C12.25 20.6381 12.3619 20.75 12.5 20.75H13.5C13.6381 20.75 13.75 20.6381 13.75 20.5ZM19.3195 11.25C18.6291 11.25 18.0695 11.8096 18.0695 12.5V14.5C18.0695 15.1904 18.6291 15.75 19.3195 15.75C20.0098 15.75 20.5695 15.1904 20.5695 14.5V12.5C20.5695 11.8096 20.0098 11.25 19.3195 11.25ZM3.62183 14.5C3.62183 15.1904 4.18147 15.75 4.87183 15.75C5.56218 15.75 6.12183 15.1904 6.12183 14.5V12.5C6.12183 11.8096 5.56218 11.25 4.87183 11.25C4.18147 11.25 3.62183 11.8096 3.62183 12.5V14.5Z" fill="black"/>
      </svg>
  },
  {
      name: 'Yoko.Studio',
      link: 'https://yoko.studio',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.9987 5L7.99532 15V19H11.9967L22 9V5H17.9987Z" fill="black"/>
              <path d="M6.00172 5.00691L2.00031 9.00699L6.00172 13.0071L10.0031 9.00699L6.00172 5.00691Z" fill="black"/>
            </svg>
  }

  ]

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const renderPage = () => {
    switch (activePage) {
        case 'Home':
            return <Home />;

        case 'Icons':
            return <Icons />;

        case 'Changelog':
            return <Changelog />;
      
        case 'About':
            return <About />;


      default:
        return <Home />;
    }
  };


  return (
    <Router>
    <div className="app-container">
      <OrSidebar 
      handleMenuToggle={handleMenuToggle}
      
      />
      <div className="main-content">
        <OrMenu itemMenu={listMenu} isOpen={menuOpen} handleToggle={handleMenuToggle} />
        <Routes>
          <Route path="/" element={<Navigate to="/icons" />} /> {/* مسیر پیش‌فرض */}
          <Route path="/home" element={<Home />} />
          <Route path="/icons" element={<Icons />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
};

export default App;