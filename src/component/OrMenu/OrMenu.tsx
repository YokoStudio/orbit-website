import * as React from 'react';
import './OrMenu.scss'


interface OrMenu {
    itemMenu: {name: string; link: string }[];
    isOpen?: boolean;
    handleToggle?: () => void 

}

const OrMenu: React.FunctionComponent<OrMenu> = ( {
    itemMenu,
    isOpen=true,
    handleToggle,
    
  }) => {
      
  return(
    <div>
        <div className={`menu ${isOpen? 'open' : ''}`} >
      <h1>menu</h1>
      <button onClick={handleToggle}>Toggle Menu</button>
      <ul>
         {itemMenu.map((item, index) =>( 
            <li key={index}>
            <a href={item.link}>{item.name}</a>  
            </li>
         ))}
      </ul>
    </div>
    <div className={` ${isOpen? 'backdrop' : ''}`}
    onClick={handleToggle}>
    </div>
    </div>
  );
};

export default OrMenu;
