import React, { useState, useEffect } from 'react';
import './Changelog.scss';
import '../../base/type-style.scss';
import OrLogs from '../../component/OrLogs/OrLogs'
import { changelogData } from './changelogData'

const Changelog: React.FC = () => {

  const [itemLogs] = useState(changelogData);

  return (
    <div className='changelog-page'>
      <p className='t1-strong'>Changelogs</p>
      <div className=''>

        <OrLogs
        itemLogs={itemLogs}
         /> 

      </div>
      
    </div>
  );
};

export default Changelog;
