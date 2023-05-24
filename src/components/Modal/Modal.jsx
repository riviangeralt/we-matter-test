import React from "react";
import classes from "./Modal.module.css";
const Modal = (props) => {
  const { isOpen, onClose, title } = props;
  return (
    <div className={classes.modal_overlay}>
      <div className={classes.modal}>
        <div className={classes.modal_header}>
          <h2 className={classes.modal_title}>{title}</h2>
          <button onClick={onClose} className={classes.modal_close}>
            &times;
          </button>
        </div>
        <div className={classes.modal_body}>
        {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
