import { Input } from "../input/input.component";
import { TextArea } from "../textarea/textarea.component";
import { TextFieldProps } from "../../common/types";

export function TextField(props: TextFieldProps) {
  if (props.type === "textarea") {
    return <TextArea {...props} />;
  }

  return <Input {...props} />;
}
