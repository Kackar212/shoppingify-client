import { Link } from "../link/link.component";
import { UsePaginationResult } from "../../hooks/usePagination";
import styles from "./paginatior.module.scss";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import Image from "next/image";
import singleArrowIcon from "/public/assets/images/pagination-single-arrow.svg";
import doubleArrowIcon from "/public/assets/images/pagination-double-arrow.svg";

export function Paginator({
  firstPage,
  previousPage,
  pages,
  isFirstPage,
  isLastPage,
  lastPage,
  nextPage,
}: UsePaginationResult) {
  return (
    <div className={styles.paginator}>
      <nav aria-label="pagination">
        <ul className={styles.paginatorList}>
          <li>
            <Link
              href={firstPage.path}
              aria-disabled={isFirstPage}
              tabIndex={isFirstPage ? -1 : 0}
              className={styles.linkPrevious}
            >
              <Image src={doubleArrowIcon} alt="Go to first page" />
            </Link>
          </li>
          <li>
            <Link
              href={previousPage.path}
              aria-disabled={isFirstPage}
              tabIndex={isFirstPage ? -1 : 0}
              className={styles.linkPrevious}
            >
              <Image src={singleArrowIcon} alt="Go to previous page" />
            </Link>
          </li>
          {pages.map(({ path, page, isCurrent }) => (
            <li key={page}>
              <Link
                href={isCurrent ? "#" : path}
                className={styles.link}
                aria-current={isCurrent && "page"}
              >
                <VisuallyHidden>page </VisuallyHidden>
                <span className={styles.page}>{page}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={nextPage.path}
              aria-disabled={isLastPage}
              tabIndex={isLastPage ? -1 : 0}
              className={styles.link}
            >
              <Image src={singleArrowIcon} alt="Go to next page" />
            </Link>
          </li>
          <li>
            <Link
              href={lastPage.path}
              aria-disabled={isLastPage}
              tabIndex={isLastPage ? -1 : 0}
              className={styles.link}
            >
              <Image src={doubleArrowIcon} alt="Go to last page" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
