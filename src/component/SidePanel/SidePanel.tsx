import React, { ReactNode } from 'react';
import './SidePanel.scss';
import  OrButton  from '../../component/OrButton/OrButton';
import Icon from '../../assets/Icon';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  downloadButton?: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  onClose,
  title,
  children,
  downloadButton
}) => {
  return (
    <div className={`side-panel ${isOpen ? 'visible' : 'hidden'}`}>
      <div className='filter-header'>
        <h2 className='t2-strong'>{title || 'Selected Items'}</h2>
        <OrButton
          layout='icon'
          appearance='outline'
          variant='secondary'
          icon={<Icon.cross />}
          onClick={onClose}
        />
      </div>

      <div className="side-panel-body">
        {children}
      </div>

      {downloadButton && title && title.includes('Selected') && (
        <div className={`dowload-button-box ${title.includes('(1)') ? 'hidden' : ''}`}>
          <OrButton
            layout='icon'
            variant='primary'
            onClick={downloadButton.onClick}
            disabled={downloadButton.disabled}
            text={downloadButton.text}
          />
        </div>
      )}
    </div>
  );
};

export default SidePanel;
