import React from 'react';
import logo from './logo.svg';
import './App.css';
import IconList from './component/IconList';

function App() {
  return (
    <div>
    <header>
        <div> {/* icon-number */}
            تعداد آیکون‌ها: 100 {/* این رو به طور نمونه گذاشتم */}
        </div>
        <div> {/* search */}
            <input type="text" placeholder="جستجو..." />
        </div>
        
    </header>

    <div> {/* main-view */}
        <IconList/> {/* نمایش دسته‌بندی‌ها */}
    </div>
</div>
  );
}

export default App;

