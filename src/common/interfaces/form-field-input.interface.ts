import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export interface FormFieldInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}
