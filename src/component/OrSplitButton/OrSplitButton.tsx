import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './OrSplitButton.scss';
import OrButton from '../OrButton/OrButton';
import Icon from '../../assets/Icon';

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface OrSplitButtonProps {
  mainText: string;
  mainIcon?: React.ReactNode;
  mainOnClick: () => void;
  menuItems: MenuItem[];
  variant?: 'primary' | 'secondary' | 'error';
  appearance?: 'fill' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
}

const OrSplitButton: React.FC<OrSplitButtonProps> = ({
  mainText,
  mainIcon,
  mainOnClick,
  menuItems,
  variant = 'secondary',
  appearance = 'fill',
  size = 'md',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const toggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
    setIsOpen(!isOpen);
  };

  const handleMainClick = () => {
    mainOnClick();
  };

  const handleMenuItemClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Create and manage portal root element
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  // Initialize portal element only when dropdown is opened
  useEffect(() => {
    if (isOpen && !portalElement && typeof document !== 'undefined') {
      // Check if portal root already exists
      let element = document.getElementById('portal-root');
      if (!element) {
        // Create new portal root if it doesn't exist
        element = document.createElement('div');
        element.id = 'portal-root';
        document.body.appendChild(element);
      }
      setPortalElement(element);
    }
  }, [isOpen, portalElement]);

  // Clear portal element when dropdown is closed
  useEffect(() => {
    if (!isOpen && portalElement) {
      // Wait for animation to complete before removing the portal element
      const timer = setTimeout(() => {
        setPortalElement(null);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen, portalElement]);

  // Clean up portal element when dropdown is closed or component unmounts
  useEffect(() => {
    return () => {
      // Only remove the portal element if it was created by this component
      const portalRoot = document.getElementById('portal-root');
      if (portalRoot && portalRoot.childElementCount === 0) {
        portalRoot.parentNode?.removeChild(portalRoot);
      }
    };
  }, []);

  // Render dropdown menu in portal
  const renderDropdownMenu = () => {
    // Only render if dropdown is open and portal element exists
    if (!isOpen || !portalElement) return null;

    const overlayStyle: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.3)',
      animation: 'fadeIn 0.2s ease-in-out'
    };

    const menuContainerStyle: React.CSSProperties = {
      position: 'absolute',
      top: `${dropdownPosition.top}px`,
      left: `${dropdownPosition.left}px`,
      width: `${dropdownPosition.width}px`,
      zIndex: 1001
    };

    // Create portal only when dropdown is open
    return createPortal(
      <div style={overlayStyle} className="dropdown-overlay" onClick={() => setIsOpen(false)}>
        <div
          className="dropdown-menu-container"
          ref={dropdownRef}
          style={menuContainerStyle}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on menu
        >
          <div className="dropdown-menu">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="dropdown-item"
                onClick={() => handleMenuItemClick(item.onClick)}
              >
                {item.icon && <span className="dropdown-item-icon">{item.icon}</span>}
                <span className="dropdown-item-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>,
      portalElement
    );
  };

  return (
    <>
      <div className="or-split-button" ref={buttonRef}>
        <div className="split-button-container">
          <OrButton
            text={mainText}
            icon={mainIcon}
            onClick={handleMainClick}
            variant={variant}
            appearance={appearance}
            size={size}
            disabled={disabled}
            layout="icon-text"
            className="main-button"
          />
          <button
            className={`dropdown-toggle ${variant} ${appearance} ${size}`}
            onClick={toggleDropdown}
            disabled={disabled}
          >
            <Icon.chevronDown />
          </button>
        </div>
      </div>
      {renderDropdownMenu()}
    </>
  );
};

export default OrSplitButton;
