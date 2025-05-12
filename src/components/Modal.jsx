import React from 'react';
import "../style/app.css"

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
