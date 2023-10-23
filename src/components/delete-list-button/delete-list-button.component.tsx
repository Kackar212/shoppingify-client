import { useEffect } from "react";
import { useDeleteListMutation } from "../../features/api";
import { TrashCanIcon } from "../trash-can-icon/trash-can-icon.component";
import { toast } from "react-toastify";
import styles from "./delete-list-button.module.scss";

interface DeleteListButtonProps {
  id: number;
}

export function DeleteListButton({ id }: DeleteListButtonProps) {
  const [mutate, { error, isLoading }] = useDeleteListMutation();

  useEffect(() => {
    if (!error) {
      return;
    }

    toast.error("Something went wrong, try again later!");
  }, [error]);

  const deleteList = () => {
    if (isLoading) {
      return;
    }

    mutate(id);
  };

  return (
    <button onClick={deleteList} className={styles.button}>
      Delete <TrashCanIcon fill="#000" aria-hidden="true" />
    </button>
  );
}
