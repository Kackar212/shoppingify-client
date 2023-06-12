export interface UseFormatDate extends Intl.DateTimeFormatOptions {
  date: string;
  locale?: string;
  defaultOptions?: Intl.DateTimeFormatOptions;
  afterFormat?: (date: string) => string;
  beforeFormat?: (date: string) => string;
}

export function useFormatDate({
  date,
  locale = "en-GB",
  defaultOptions = {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
  afterFormat = (date) => date,
  beforeFormat = (date) => date,
  ...options
}: UseFormatDate) {
  const intlOptions = {
    ...defaultOptions,
    ...options,
  };

  const formattedDate = new Intl.DateTimeFormat(locale, intlOptions).format(
    new Date(beforeFormat(date))
  );

  return afterFormat(formattedDate);
}
