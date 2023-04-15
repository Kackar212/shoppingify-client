import React, { ReactNode } from "react";
import FocusTrap from "focus-trap-react";
import styles from "./modal.module.scss";

interface ModalProps extends FocusTrap.Props {
  children?: ReactNode;
  isOpen: boolean;
  close: () => void;
}

export function Modal({ children, isOpen, close, ...props }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.container}>
      <FocusTrap
        {...props}
        focusTrapOptions={{
          ...props.focusTrapOptions,
          clickOutsideDeactivates: true,
        }}
      >
        <div className={styles.modal}>
          <dialog
            open={isOpen}
            aria-modal="true"
            onClose={close}
            className={styles.dialog}
          >
            {children}
          </dialog>
        </div>
      </FocusTrap>
      <div onClick={close} className={styles.backdrop}></div>
    </div>
  );
}
