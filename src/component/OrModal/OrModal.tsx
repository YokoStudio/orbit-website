// Modal.tsx
import React, { useEffect, useState } from 'react';
import './OrModal.scss';
import OrButton from '../OrButton/OrButton';
import Icon from '../../assets/Icon';

interface ModalProps {
  title?: string;
  dis?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  dis,
  isOpen,
  onClose,
  children
}) => {
  const [animationClass, setAnimationClass] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // Small delay to ensure DOM has updated before adding animation class
      setTimeout(() => {
        setAnimationClass('visible');
      }, 10);
    } else {
      setAnimationClass('');
      // Wait for animation to complete before hiding the component
      const timer = setTimeout(() => {
        setVisible(false);
      }, 300); // Match this with the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div className={`modal-overlay ${animationClass}`} onClick={onClose}>
      <div className={`modal-body ${animationClass}`} onClick={(e) => e.stopPropagation()}>
        <div className='modal-title'>
          <div className='modal-title-wrapper'>
            <span className='t1-strong'>
              {title}
            </span>
            <span className='b1'>
              {dis}
            </span>
          </div>

          <OrButton
            layout='icon'
            appearance='outline'
            variant='secondary'
            size='md'
            icon={<Icon.cross/>}
            onClick={onClose}
          />
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
