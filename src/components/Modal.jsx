import React from "react";

function Modal({ visible = false, children, ...props }) {
  return (
    <div
      className={`${
        visible ? "flex" : "hidden"
      } fixed left-24 top-0 z-50 w-screen h-screen backdrop-blur-[1.5px] bg-slate-200/50 items-center justify-center`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Modal;
