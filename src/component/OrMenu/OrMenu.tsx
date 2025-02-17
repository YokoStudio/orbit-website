import * as React from 'react';
import './OrMenu.scss'


interface OrMenu {
    itemMenu: {name: string; link: string; icon: React.ReactNode }[];
    isOpen?: boolean;
    handleToggle?: () => void 

}

const OrMenu: React.FunctionComponent<OrMenu> = ({
  itemMenu,
  isOpen = true,
  handleToggle,
}) => {
  return (
    <div>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-body">
          {itemMenu.map((item, index) => (
            <a className='b2-strong' target="_blank" href={item.link}>
            <div className="b2-strong menu-item" key={index}>
              {/* آیکون به عنوان JSX رندر شود */}
              
              {item.icon && <span className="menu-icon">{item.icon}</span>}
              {item.name}
            </div>
            </a>
          ))}
        </div>
      </div>
      <div className={`${isOpen ? 'backdrop' : ''}`} onClick={handleToggle}></div>
    </div>
  );
};

export default OrMenu;
