import React, { useState, useEffect } from 'react';
import './Changelog.scss';
import '../../style.scss'
import '../../base/type-style.scss';
import OrLogs from '../../component/OrLogs/OrLogs'
import { changelogData } from './changelogData'

const Changelog: React.FC = () => {

  const [itemLogs] = useState(changelogData);

  return (
    <div className='changelog-page main-container'>
     <div className='content-container'>
      <p className='t1-strong'>Changelogs</p>
        <div className=''>
          <OrLogs
          itemLogs={itemLogs}
          /> 
        </div>
     </div>
    </div>
  );
};

export default Changelog;
