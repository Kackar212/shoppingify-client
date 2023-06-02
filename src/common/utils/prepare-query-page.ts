export function prepareQueryPage(page: number) {
  if (!page) {
    return 1;
  }

  if (page < 1) {
    return 1;
  }

  return page;
}
