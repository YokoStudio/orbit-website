import React, { useState } from 'react';
import './App.scss';
import OrSidebar from './component/OrSidebar/OrSidebar';
import Home from './Page/Home/Home'; 
import Icons from './Page/Icons/Icons'; // فراخوانی کامپوننت جدید Icons
import Changelog from './Page/Changelog/Changelog';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('Icons'); // می‌توانید پیش‌فرض روی Icons تنظیم کنید

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
      <div className="main-content">
        {renderPage()} {/* محتوای اصلی */}
      </div>
    </div>
  );
};

export default App;
