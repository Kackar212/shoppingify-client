export interface HashRoute {
  pathname: string;
  matchers?: Record<string, string>;
  isMatched?: boolean;
  parameters?: Record<string, string>;
}
