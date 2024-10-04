import React, { useState } from 'react';
import './App.scss';
import OrSidebar from './component/OrSidebar/OrSidebar';
import Home from './Page/Home/Home'; 
import Icons from './Page/Icons/Icons'; // فراخوانی کامپوننت جدید Icons
import Changelog from './Page/Changelog/Changelog';
import OrNavigationbar from './component/OrNavigationbar/OrNavigationbar';
import OrMenu from './component/OrMenu/OrMenu';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('Icons'); // می‌توانید پیش‌فرض روی Icons تنظیم کنید
  const [menuOpen, setMenuOpen] = useState(false); // ��یا منوی بالا با�� شود��

  const listMenu = [
    {
      name: 'Eanlami',
      link: 'https://eanlami.com'
  },
  {
      name: 'Yoko',
      link: 'https://yoko.studio'
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


      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      <OrSidebar setActivePage={setActivePage} activePage={activePage} />
      <OrNavigationbar setActivePage={setActivePage} activePage={activePage} handleMenuToggle={handleMenuToggle}/>
      <div className="main-content">
     <OrMenu
              itemMenu={listMenu}
              isOpen={menuOpen}
              handleToggle={handleMenuToggle}
             
             />
        {renderPage()} {/* محتوای اصلی */}
      </div>
    </div>
  );
};

export default App;