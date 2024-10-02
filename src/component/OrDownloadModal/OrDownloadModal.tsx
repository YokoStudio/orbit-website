// Modal.tsx
import React from 'react';
import './OrDownloadModal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // محتوا درون مودال
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // اگر مودال باز نیست، چیزی نمایش نده

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times; {/* علامت بستن */}
        </button>
        {children} {/* محتوا */}
      </div>
    </div>
  );
};

export default Modal;
