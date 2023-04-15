import { useGetActiveListQuery, useSaveListMutation } from "../../features/api";
import { Button } from "../button/button.component";
import { Form } from "../form/form.component";
import { Input } from "../input/input.component";
import * as yup from "yup";
import styles from "./save-list-form.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormField } from "../form-field/form-field.component";
import { useCallback, useEffect } from "react";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectShoppingList } from "../../features/slices/shopping-list.slice";

const onlyLettersAndNumbersRegex = /^[a-źA-Ź0-9 ]+$/;
const startsWithLetterRegex = /^[A-Ź].*/i;

const saveListSchema = yup
  .object({
    listName: yup
      .string()
      .min(3, "list name must be at least 3 characters long")
      .max(125, "list name can be only 125 characters long")
      .matches(
        onlyLettersAndNumbersRegex,
        "list name may contain only letters and numbers"
      )
      .matches(startsWithLetterRegex, "list name must starts with letter")
      .required("list name is required"),
  })
  .required();

interface FormValues {
  listName: string;
}

export function SaveListForm() {
  const { hasProducts } = useSelector(selectShoppingList);
  const [saveActiveList, { isSuccess, isLoading }] = useSaveListMutation();

  const saveList = useCallback(
    ({ listName }: FormValues) => {
      if (!hasProducts) {
        toast.error("You cannot save list without products!", {
          role: "generic",
        });

        return;
      }

      saveActiveList(listName);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasProducts]
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("List has been saved!");
    }
  }, [isSuccess]);

  return (
    <Form<FormValues>
      onSubmit={saveList}
      options={{
        resolver: yupResolver(saveListSchema),
      }}
      className={styles.form}
    >
      <FormField
        name="listName"
        label="List name"
        required
        className={styles.field}
        render={({ name, errorId, placeholder }) => {
          return (
            <Input
              name={name}
              id={name}
              aria-describedby={errorId}
              placeholder={placeholder}
            />
          );
        }}
      />
      <Button type={"submit"} isLoading={isLoading} className={styles.submit}>
        <span aria-hidden={!hasProducts}>
          Save <VisuallyHidden>list</VisuallyHidden>
        </span>
        {!hasProducts && (
          <VisuallyHidden>
            You cannot save list without any products!
          </VisuallyHidden>
        )}
      </Button>
    </Form>
  );
}
