import React, { useState } from 'react';
import './OrTab.scss';

interface OrTabProps {
  tabs: string[]; // لیستی از نام تب‌ها
  onTabChange: (tab: string) => void; // تابعی که تب فعال را به والد منتقل می‌کند
  isSegmentControl?: boolean; // آیا کامپوننت به‌صورت کنترل سگمنت رندر شود یا تب
}

const OrTab: React.FC<OrTabProps> = ({ tabs, onTabChange, isSegmentControl = false }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className={`or-tab ${isSegmentControl ? 'segment-control' : 'tabs'}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default OrTab;
