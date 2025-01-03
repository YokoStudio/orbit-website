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
          <span className='h4-strong'>This is Orbit v1</span>
          <p className='b2'>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          </p>
          <p className='b2'>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          </p>
          
        </div>
     </div>
    </div>
  );
};

export default About;
