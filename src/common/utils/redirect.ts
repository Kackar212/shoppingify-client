import { IncomingMessage, ServerResponse } from "http";

export function redirect(
  path: string,
  res?: ServerResponse<IncomingMessage>,
  statusCode: number = 302
) {
  return res?.writeHead(statusCode, { Location: path }).end();
}
