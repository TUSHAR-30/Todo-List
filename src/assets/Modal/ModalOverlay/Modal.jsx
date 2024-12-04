// Modal.js
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

function Modal({ show, onClose, children }) {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content"  onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}

export default Modal;
