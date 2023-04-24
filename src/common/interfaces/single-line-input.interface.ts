import { FocusEventHandler, InputHTMLAttributes } from "react";
import { HTMLInputTypeAttribute } from "../types";

export interface SingleLineInput extends InputHTMLAttributes<HTMLInputElement> {
  type?: HTMLInputTypeAttribute;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}
