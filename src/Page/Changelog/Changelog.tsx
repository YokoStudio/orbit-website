import React, { useState, useEffect } from 'react';
import './Changelog.scss';
import '../../style.scss'
import '../../base/type-style.scss';
import OrLogs from '../../component/OrLogs/OrLogs'
import { changelogData } from './changelogData'
import OrHeader from '../../component/OrHeader/OrHeader';


const Changelog: React.FC = () => {

  const [itemLogs] = useState(changelogData);

  return (
    <div className='changelog-page main-container'>
      <OrHeader>
        
        <p className='h6-strong'>Changelogs</p>
  
      </OrHeader>
     <div className='content-container'>
      
      {/* <p className='h6-strong'>Changelogs</p> */}
        <div className='scroll-list'>
          <OrLogs
          itemLogs={itemLogs}
          /> 
        </div>
     </div>
    </div>
  );
};

export default Changelog;
