import {
  CANCELED_BADGE_COLOR,
  COMPLETED_BADGE_COLOR,
} from "../../common/constants";
import { ListStatus } from "../../common/types";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import styles from "./status-badge.module.scss";

interface StatusBadgeProps {
  status: ListStatus;
  canceledBadgeColor?: string;
  completedBadgeColor?: string;
}

export function StatusBadge({
  status,
  canceledBadgeColor = CANCELED_BADGE_COLOR,
  completedBadgeColor = COMPLETED_BADGE_COLOR,
}: StatusBadgeProps) {
  const isCanceled = status === "canceled";
  const badgeColor = isCanceled ? canceledBadgeColor : completedBadgeColor;

  return (
    <div
      className={styles.statusBadge}
      style={{
        "--badge-color": badgeColor,
      }}
    >
      <VisuallyHidden>status: </VisuallyHidden>
      {status}
    </div>
  );
}
