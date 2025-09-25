import React, { type ReactNode } from 'react';

import './modal.scss';

const Modal = ({ children }: { children: ReactNode }) => {

  return (
    <React.Fragment>
      <div className="modal-backdrop"></div>
      
      <div className="modal-container">
        { children }
      </div>
    </React.Fragment>
  )
}

export default Modal;