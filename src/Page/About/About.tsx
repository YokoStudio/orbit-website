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
          
        </div>
     </div>
    </div>
  );
};

export default About;
