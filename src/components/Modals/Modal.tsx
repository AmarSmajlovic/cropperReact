import React from "react";
import ReactModal, { Props } from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "80%",
    height: "90vh",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    boxShadow: "-4px -3px 45px 21px rgba(0,0,0,0.35)",
    transform: "translate(-50%, -50%)",
  },
};

const Modal = (props: Props) => {
  return (
    <ReactModal ariaHideApp={false} style={customStyles} {...props}>
      {props.children}
    </ReactModal>
  );
};

export default Modal;
