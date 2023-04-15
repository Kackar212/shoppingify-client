import { ReactNode, useCallback, useRef } from "react";
import { useSafeContext } from "../../hooks/useSafeContext";
import { Modal } from "../modal/modal.component";
import { PlusIcon } from "../plus-icon/plus-icon.component";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import {
  Action,
  confirmModalContext,
} from "../../common/context/confirm-modal";
import styles from "./confirm-modal.module.scss";

interface ConfirmModalProps {
  children: ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function ConfirmModal({
  children,
  onConfirm = () => {},
  onCancel = () => {},
}: ConfirmModalProps) {
  const { dispatch, isOpen } = useSafeContext(confirmModalContext);
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    dispatch({ type: Action.Close });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnConfirm = useCallback(() => {
    dispatch({ type: Action.Confirm });

    onConfirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onConfirm]);

  const handleOnCancel = useCallback(() => {
    dispatch({ type: Action.Cancel });

    onCancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCancel]);

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      focusTrapOptions={{ initialFocus: confirmButtonRef.current || false }}
    >
      <div>
        <div className={styles.container}>{children}</div>
        <form method="dialog" className={styles.form}>
          <button className={styles.closeButton}>
            <PlusIcon />
            <VisuallyHidden>Close</VisuallyHidden>
          </button>
          <button onClick={handleOnCancel} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            onClick={handleOnConfirm}
            className={styles.confirmButton}
            ref={confirmButtonRef}
          >
            Yes
          </button>
        </form>
      </div>
    </Modal>
  );
}
