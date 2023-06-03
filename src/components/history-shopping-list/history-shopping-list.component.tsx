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
import { CalendarIcon } from "../calendar-icon/calendar-icon.component";

const formatDate = (locale: string, date: string) => {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(new Date(date))
    .replaceAll(/\//g, ".")
    .replace(",", "");
};

interface HistoryShoppingListProps extends ShoppingList {
  name: string;
  canceledBadgeColor?: string;
  completedBadgeColor?: string;
}

export function HistoryShoppingList({
  id,
  name,
  createdAt,
  status,
  canceledBadgeColor = CANCELED_BADGE_COLOR,
  completedBadgeColor = COMPLETED_BADGE_COLOR,
}: HistoryShoppingListProps) {
  const sluggifiedName = slugify(name, { lower: true });
  const isCanceled = status === "canceled";
  const badgeColor = isCanceled ? canceledBadgeColor : completedBadgeColor;
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
          <div
            className={styles.statusBadge}
            style={{
              "--badge-color": badgeColor,
            }}
          >
            <VisuallyHidden>status: </VisuallyHidden>
            {status}
          </div>
          <div className={styles.row}>
            <VisuallyHidden>Created at: </VisuallyHidden>
            <time dateTime={createdAt} className={styles.date}>
              {formatDate("en-GB", createdAt)}
            </time>
            <CalendarIcon className={styles.icon} />
          </div>
        </div>
      </div>
    </li>
  );
}
