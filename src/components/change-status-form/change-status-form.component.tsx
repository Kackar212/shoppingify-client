import { useCallback } from "react";
import { useUpdateListStatusMutation } from "../../features/api";
import { LIST_STATUS } from "../../common/constants";
import { Button } from "../button/button.component";
import styles from "./change-status-form.module.scss";
import { ConfirmModalProvider } from "../../common/context/confirm-modal/confirm-modal.provider";
import { Action } from "../../common/context/confirm-modal/confirm-modal.reducer";
import { ConfirmModal } from "../confirm-modal/confirm-modal.component";
import { toast } from "react-toastify";
import { useConfirmModal } from "../../common/context/confirm-modal";

interface ChangeStatusProps {
  shoppingListId: number;
}

type ChangeStatusMutationArgs = {
  id: number;
  status: typeof LIST_STATUS[keyof typeof LIST_STATUS];
};

function createToast<T extends (...args: any[]) => Promise<any>>(
  request: T,
  { id, status }: ChangeStatusMutationArgs
) {
  return toast.promise(
    request({ id, status }),
    {
      pending: "Wait",
      success: `List ${status}`,
    },
    {
      role: "generic",
    }
  );
}

export function ChangeStatus({ shoppingListId }: ChangeStatusProps) {
  const [changeStatus, { isLoading }] = useUpdateListStatusMutation();
  const modalContext = useConfirmModal();

  const cancelList = useCallback(() => {
    modalContext.dispatch({ type: Action.Open });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completeList = useCallback(() => {
    createToast(changeStatus, {
      id: shoppingListId,
      status: LIST_STATUS.COMPLETED,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingListId]);

  const onConfirm = useCallback(() => {
    createToast(changeStatus, {
      id: shoppingListId,
      status: LIST_STATUS.CANCELED,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingListId]);

  return (
    <div className={styles.container}>
      <Button
        className={styles.cancelButton}
        onClick={cancelList}
        isLoading={isLoading}
      >
        cancel
      </Button>
      <Button
        className={styles.completeButton}
        onClick={completeList}
        isLoading={isLoading}
      >
        complete
      </Button>

      <ConfirmModalProvider value={modalContext}>
        <ConfirmModal onConfirm={onConfirm}>
          <div>
            <h2>Are you sure that you want to cancel this list?</h2>
          </div>
        </ConfirmModal>
      </ConfirmModalProvider>
    </div>
  );
}
