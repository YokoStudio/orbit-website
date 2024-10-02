import React, { useState } from 'react';
import './App.scss';
import OrSidebar from './component/OrSidebar/OrSidebar';
import Home from './Page/Home/Home'; 
import Icons from './Page/Icons/Icons'; // فراخوانی کامپوننت جدید Icons
import Changelog from './Page/Changelog/Changelog';
import OrNavigationbar from './component/OrNavigationbar/OrNavigationbar';

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
      <OrNavigationbar setActivePage={setActivePage} activePage={activePage}/>
      <div className="main-content">
        {renderPage()} {/* محتوای اصلی */}
      </div>
    </div>
  );
};

export default App;

// import React, { useState } from 'react';
// import './App.scss';
// import OrSidebar from './component/OrSidebar/OrSidebar';
// import Home from './Page/Home/Home'; 
// import Icons from './Page/Icons/Icons'; 
// import Changelog from './Page/Changelog/Changelog';
// import OrNavigationbar from './component/OrNavigationbar/OrNavigationbar';
// import Loading from './component/OrLoading/OrLoading'; // اضافه کردن کامپوننت Loading

// const App: React.FC = () => {
//   const [activePage, setActivePage] = useState<string>('Icons');
//   const [loading, setLoading] = useState<boolean>(false);

//   const handlePageChange = (page: string) => {
//     setLoading(true);
//     setTimeout(() => {
//       setActivePage(page);
//       setLoading(false);
//     }, 1500); // تأخیر 1500 میلی‌ثانیه برای مشاهده انیمیشن
//   };

//   const renderPage = () => {
//     switch (activePage) {
//       case 'Home':
//         return <Home />;
//       case 'Icons':
//         return <Icons />;
//       case 'Changelog':
//         return <Changelog />;
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <div className="app-container">
//       <OrSidebar setActivePage={handlePageChange} activePage={activePage} />
//       <OrNavigationbar setActivePage={handlePageChange} activePage={activePage} />
//       <div className="main-content">
//         {renderPage()} {/* محتوای اصلی */}
//       </div>
//       {loading && <Loading />} {/* نمایش کامپوننت Loading در صورت بارگذاری */}
//     </div>
//   );
// };

// export default App;
