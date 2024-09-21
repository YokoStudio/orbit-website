import React, { useEffect, useState, ChangeEvent, ReactNode } from "react";
import './Home.scss';
import axios from 'axios';
import '../../base/type-style.scss';
import Logo from '../../assets/logo.svg'





const Home: React.FC = () => {

  const [iconCount, setIconCount] = useState<number>(0);

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
    <div className='home-page'>
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
      
    </div>
  );
};

export default Home;
