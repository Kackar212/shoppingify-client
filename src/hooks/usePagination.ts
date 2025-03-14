import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export enum PaginationState {
  Start = "start",
  Complete = "complete",
  Error = "error",
}

export interface UsePaginationArgs {
  page: number;
  total: number;
  take: number;
  leftDirection?: number;
  rightDirection?: number;
  onRouteChangeStart?: (url: string, shallow: boolean) => void;
  onRouteChangeError?: (
    isCancelled: boolean,
    url: string,
    shallow: boolean
  ) => void;
  onRouteChangeComplete?: (url: string, shallow: boolean) => void;
}

interface Page {
  page: number;
  path: {
    href: string;
    query: Record<string, number | string | string[] | undefined> & {
      page: number;
    };
  };
  isCurrent: boolean;
}

export interface UsePaginationResult {
  pages: Page[];
  page: number;
  take: number;
  total: number;
  numberOfPages: number;
  state: PaginationState | null;
  setPaginationState: Dispatch<SetStateAction<PaginationState | null>>;
  isLastPage: boolean;
  isFirstPage: boolean;
  isCurrent: (page: number) => boolean;
  lastPage: Page;
  firstPage: Page;
  previousPage: Page;
  nextPage: Page;
}

function getCurrentPageNumber(page: number, numberOfPages: number) {
  if (page > numberOfPages) {
    return numberOfPages;
  }

  if (page < 1) {
    return 1;
  }

  return Math.trunc(page);
}

export function usePagination({
  page,
  total,
  take,
  leftDirection = 6,
  rightDirection = leftDirection,
  onRouteChangeStart = () => null,
  onRouteChangeError = () => null,
  onRouteChangeComplete = () => null,
}: UsePaginationArgs): UsePaginationResult {
  const router = useRouter();
  const [state, setPaginationState] = useState<PaginationState | null>(null);

  const pagination = useMemo(() => {
    function transformPage(page: number, currentPage: number) {
      return {
        page,
        path: {
          href: router.route,
          query: { ...router.query, page },
        },
        isCurrent: currentPage === page,
      };
    }

    const sides = {
      left: leftDirection,
      right: rightDirection,
    };

    const numberOfPages = Math.max(1, Math.ceil(total / take));
    const currentPage = getCurrentPageNumber(page, numberOfPages);
    const currentPageIndex = currentPage - 1;
    const length = Math.min(sides.left + sides.right + 1, numberOfPages);
    const result = {
      page: currentPage,
      total,
      take,
      numberOfPages,
      state,
      setPaginationState,
      isLastPage: currentPage === numberOfPages,
      isFirstPage: currentPage === 1,
      isCurrent(page: number) {
        return this.page === page;
      },
    };

    if (sides.left > result.page) {
      sides.left = result.page;
    }

    const rightDiff = Math.max(
      rightDirection - (numberOfPages - result.page),
      0
    );
    let start = result.page - sides.left - rightDiff;
    start = start > 0 ? start - 1 : 0;

    const pages = Array.from({ length }, (_, index) =>
      transformPage(index + start + 1, currentPage)
    );

    const firstPage = transformPage(1, currentPage);
    const lastPage = transformPage(numberOfPages, currentPage);

    return {
      ...result,
      pages,
      firstPage,
      lastPage,
      nextPage: pages[currentPage - start] || lastPage,
      previousPage: pages[currentPageIndex - start - 1] || firstPage,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, page, take, state]);

  useEffect(() => {
    const handleRouteChangeStart = (
      url: string,
      options: { shallow: boolean }
    ) => {
      onRouteChangeStart(url, options.shallow);

      setPaginationState(PaginationState.Start);
    };

    const handleRouteChangeError = (
      err: { cancelled: boolean },
      url: string,
      options: { shallow: boolean }
    ) => {
      onRouteChangeError(err.cancelled, url, options.shallow);

      setPaginationState(PaginationState.Error);
    };

    const handleRouteChangeComplete = (
      url: string,
      options: { shallow: boolean }
    ) => {
      onRouteChangeComplete(url, options.shallow);

      setPaginationState(PaginationState.Complete);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeError", handleRouteChangeError);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeError", handleRouteChangeError);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return pagination;
}
