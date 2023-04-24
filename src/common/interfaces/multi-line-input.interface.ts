import { FocusEventHandler, TextareaHTMLAttributes } from "react";

export interface MultiLineInput
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  type: "textarea";
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}
