import React, { useState, useEffect } from 'react';
import '../../style.scss'
import '../../base/type-style.scss';
import OrHeader from '../../component/OrHeader/OrHeader';

const About: React.FC = () => {



  return (
    <div className='changelog-page main-container'>
      <OrHeader>
        
        <p className='h6-strong'>About</p>
  
      </OrHeader>
     <div className='content-container'>
      
      {/* <p className='h6-strong'>Changelogs</p> */}
        <div className='scroll-list'>
          <span className='h4-strong'>Welcome to Orbit Icon pack </span>
          <p className='b2'>
          At Orbit, we believe that icons are the universal language of design, capable of simplifying complex ideas and enhancing user experiences. Our dedicated team of designers has worked tirelessly to craft a comprehensive collection of over (...)high-quality, customizable icons designed to meet the needs of modern designers and developers.  
          </p>
          <p className='b2'>
          Our icons are meticulously crafted for clarity, consistency, and scalability, supporting a wide range of design projects, from mobile apps to enterprise solutions. With a focus on versatility, our library spans various categories, ensuring you find the perfect visual representation for your ideas.  
          </p>
          <span className='h5-strong'>Why Choose Orbit?</span>
          <p>
            Impeccable Quality: Every icon undergoes rigorous quality checks to ensure top-tier performance and visual harmony. Tailored Custom Icons: Get custom icons designed specifically to meet your project’s unique needs. Time-Saving Solutions: Instantly enhance your designs with a comprehensive, ready-to-use icon library. Unparalleled Versatility: Seamlessly integrate icons into web, mobile, and desktop applications for consistent visual experiences.
          </p>
          <p>
          In addition, you can leverage Yoko Space Design System, which integrates seamlessly with Orbit Icons to provide a unified and cohesive design experience.
          </p>
          <p>
          Together, Orbit Icons and Space empower designers and developers to craft innovative, user-centric solutions with speed, simplicity, and consistency.
          </p>
          
        </div>
     </div>
    </div>
  );
};

export default About;
