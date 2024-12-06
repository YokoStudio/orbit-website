// Modal.tsx
import React from 'react';
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
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div className='modal-body' onClick={(e) => e.stopPropagation()}>
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
