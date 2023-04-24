import { InputHTMLAttributes } from "react";
import { HTMLInputTypeAttribute } from "../types";

export interface FormFieldInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute | "textarea";
  placeholder?: string;
}
