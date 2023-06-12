import Image from "next/image";
import { ShoppingList } from "../../common/interfaces/shopping-list.interface";
import arrowIcon from "/public/assets/images/pagination-single-arrow.svg";
import styles from "./history-shopping-list.module.scss";
import slugify from "slugify";
import { Link } from "../link/link.component";
import {
  CANCELED_BADGE_COLOR,
  COMPLETED_BADGE_COLOR,
} from "../../common/constants";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import { StatusBadge } from "../status-badge/status-badge.component";
import { Time } from "../time/time.component";

interface HistoryShoppingListProps extends ShoppingList {
  name: string;
  canceledBadgeColor?: string;
  completedBadgeColor?: string;
}

const afterFormat = (date: string) =>
  date.replaceAll(/\//g, ".").replace(",", "");

export function HistoryShoppingList({
  id,
  name,
  createdAt,
  status,
  canceledBadgeColor = CANCELED_BADGE_COLOR,
  completedBadgeColor = COMPLETED_BADGE_COLOR,
}: HistoryShoppingListProps) {
  const sluggifiedName = slugify(name, { lower: true });
  const href = {
    pathname: `/history/[name]/[id]`,
    query: { id, name: sluggifiedName },
  };

  return (
    <li className={styles.list}>
      <div className={styles.column}>
        <Link href={href} className={styles.link}>
          <span className={styles.name}>{name}</span>
          <Image src={arrowIcon} alt="" width={16} height={16} />
        </Link>

        <div className={styles.row}>
          <StatusBadge
            canceledBadgeColor={canceledBadgeColor}
            completedBadgeColor={completedBadgeColor}
            status={status}
          />
          <p>
            <VisuallyHidden>Created at: </VisuallyHidden>
            <Time date={createdAt} afterFormat={afterFormat} />
          </p>
        </div>
      </div>
    </li>
  );
}
