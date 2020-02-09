import React from "react";
import ReactDOM from "react-dom";

import './index.scss'

const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.hideModal} className="modal__container">
      <div onClick={(e) => e.stopPropagation()} className="modal__content-container">
          {props.header ? <div className="modal__header">{props.header}</div> : null}
          <div className="modal__children">
              {props.children}
          </div>
          {props.onSubmit ? <div className="modal__actions">
            <button onClick={props.onSubmit} className="modal__actions-button modal__actions-submit">{props.modalSubmitText ? props.modalSubmitText : 'ادامه'}</button>
            <button onClick={props.onCancel} className="modal__actions-button modal__actions-cancel">{props.modalCancelText ? props.modalCancelText : 'بیخیال'}</button>
          </div> : null}
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
