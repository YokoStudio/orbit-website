import React, { useEffect, useState, ChangeEvent, ReactNode } from "react";
import './Home.scss';
import axios from 'axios';
import '../../base/type-style.scss';
import Logo from '../../assets/logo.svg'
import heroLoop from '../../assets/Hero loop.gif'
import OrButton from "../../component/OrButton/OrButton";
import Icon from '../../assets/Icon';
import OrHeader from "../../component/OrHeader/OrHeader";





const Home: React.FC = () => {

  const [iconCount, setIconCount] = useState<number>(123);

  const fetchIconCount = async () => {
    try {
        // دریافت لیست آیکون‌ها به صورت XML از bucket
        const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?list-type=2');

        // تبدیل XML به JSON
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "application/xml");

        // گرفتن تمام تگ‌های <Key> که نشان دهنده مسیر آیکون‌ها هستند
        const keys = xmlDoc.getElementsByTagName("Key");

        // فیلتر کردن آیکون‌هایی که با فرمت SVG هستند
        const svgIcons = Array.from(keys).filter((key: Element) => {
            const filePath = key.textContent || '';
            return filePath.endsWith('.svg');  // فقط فایل‌های SVG
        });

        // تنظیم تعداد آیکون‌های فیلتر شده
        setIconCount(svgIcons.length);
    } catch (error) {
        console.error('Error fetching icon count:', error);
    }
};

useEffect(() => {
  fetchIconCount();
}, []);

  return (
    <div className='changelog-page main-container'>
        
           {/* <div>
     <div className="hero">
      <span className="h6 home-badge">v1.0.0</span>
      <img className="hero-logo" width='240px' src={Logo}></img>
      </div>
     
      <div>
      <span className="h6">Access to </span>
      <span className="h6-strong sharp-text">{iconCount} Icons </span>
      <span className="h6">in </span>
      <span className="h6-strong sharp-text"> 2 Style </span>
      </div>
     </div> */}
      {/* <OrHeader>
        <p className='h6-strong'>Home</p>
      </OrHeader> */}
        <div className="content-container hero">
          <div className="hero-title">
          <svg className="hero-logo" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 655.72 180">
          <path d="M475.72,32.14h0A32.14,32.14,0,0,1,507.86,0h0A32.14,32.14,0,0,1,540,32.14h0a32.14,32.14,0,0,1-32.14,32.15h0A32.14,32.14,0,0,1,475.72,32.14ZM540,180V109.29L514.29,77.14H475.72V180ZM655.72,77.14V51.43H636.43V25.22L610.72.08,572.15,0V51.43H552.86v51.43l19.29-6.43v34s0,49.61,32.14,49.61h51.43V115.72H636.43V82ZM257.15,38.57V.09L225,0,192.86,25.71V180h64.29V128.57L295.72,90V25.71H276.31ZM180,90a90,90,0,1,0-90,90A90,90,0,0,0,180,90ZM385.79,25.71a78.59,78.59,0,0,0-9.77.64V0H308.64V102.86a77.15,77.15,0,1,0,77.15-77.15Z"/>
          </svg>
            <span className="hero-head h5-strong">Simplify Your Designs with the Power of Orbit Icons.</span>
            <span>Empower your creativity with meticulously crafted icons designed to enhance clarity, consistency, and visual impact.</span>
            <div className="hero-action">
              <OrButton layout="icon-text" appearance="fill" size="lg" text="Get start" icon={<Icon.tune/>} />
              <OrButton layout="text" size="lg" appearance="outline" variant="secondary"  text="Learn more" />
            </div>
          </div>
  
  
        </div>
    
  
      
    </div>
  );
};

export default Home;
