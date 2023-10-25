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
import { Share } from "../share/share.component";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/slices/auth.slice";
import { DeleteListButton } from "../delete-list-button/delete-list-button.component";
import { User } from "../../common/interfaces/user.interface";

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
  authorizedUsers,
  user: owner,
  canceledBadgeColor = CANCELED_BADGE_COLOR,
  completedBadgeColor = COMPLETED_BADGE_COLOR,
}: HistoryShoppingListProps) {
  const sluggifiedName = slugify(name, { lower: true });
  const href = {
    pathname: `/history/[name]/[id]`,
    query: { id, name: sluggifiedName },
  };
  const { user: currentUser } = useSelector(selectAuth);
  const isCurrentUser = (user: User) => currentUser?.id === user.id;

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
        {isCurrentUser(owner) && (
          <div className={styles.buttons}>
            <Share
              id={id}
              owner={owner}
              authorizedUsers={authorizedUsers || []}
            />
            <DeleteListButton id={id} />
          </div>
        )}
        {!isCurrentUser(owner) && (
          <p>
            Shared with you by{" "}
            <span className={styles.username}>{owner.name}</span>!
          </p>
        )}
      </div>
    </li>
  );
}
