import { useCallback, useEffect } from "react";
import { FormFieldInput } from "../../common/interfaces/form-field-input.interface";
import { searchCategories, useCreateProductMutation } from "../../features/api";
import { FormField } from "../form-field/form-field.component";
import { Form } from "../form/form.component";
import { Search } from "../search/search.component";
import { Option, useSearch } from "../../hooks/useSearch";
import { TextField } from "../text-field/text-field.component";
import styles from "./create-product-form.module.scss";
import { CreateProductBody } from "../../common/interfaces/create-product-body.interface";
import { Button } from "../button/button.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { API_SUCCESS, VALIDATION_MODE_ALL } from "../../common/constants";
import { Sidebar } from "../sidebar/sidebar.component";
import { useGetErrorMessage } from "../../hooks/useGetErrorMessage";
import { SingleValue } from "react-select";

const inputs: Array<FormFieldInput> = [
  {
    name: "name",
    label: "Name",
    required: true,
  },
  {
    name: "note",
    label: "Note",
    type: "textarea",
  },
  { name: "image", label: "Image" },
];

const categoryNameSchema = yup
  .string()
  .min(3, "Category must be at least 3 characters")
  .max(80, "Category must be at most 80 characters")
  .required("You must select category or create new!");

const categorySchema = yup.object({
  id: yup.number().integer().optional(),
  name: yup
    .string()
    .min(3, "Category must be at least 3 characters")
    .max(80, "Category must be at most 80 characters")
    .required("You must select category or create new!"),
});

const createProductSchema = yup
  .object({
    name: yup.string().min(3).max(50).required(),
    note: yup.string().max(255),
    image: yup.string().url(),
    category: categorySchema,
  })
  .required();

interface CreateProductFormValues extends Omit<CreateProductBody, "category"> {
  category?: SingleValue<Option>;
}

export function CreateProductForm() {
  const [searchCategoriesByName, queryState] = searchCategories.useLazyQuery();
  const [createProduct, { isLoading, isSuccess, error }] =
    useCreateProductMutation();
  const formContextValue = useForm<CreateProductFormValues>({
    resolver: yupResolver(createProductSchema),
    mode: VALIDATION_MODE_ALL,
  });

  const searchProps = useSearch({
    query: searchCategoriesByName,
    queryState,
  });

  const errorMessage = useGetErrorMessage(error);

  useEffect(() => {
    const isDirty = !!formContextValue.formState.dirtyFields.category;
    const category = searchProps.value;

    formContextValue.setValue("category", category, {
      shouldValidate: !!searchProps.value || isDirty,
      shouldDirty: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchProps.value]);

  const handleCreateProduct = useCallback(
    async (createProductBody: CreateProductFormValues) => {
      if (isLoading) return;

      await createProduct(createProductBody as CreateProductBody).unwrap();

      formContextValue.reset();
      searchProps.reset();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading]
  );

  return (
    <Sidebar>
      <Form<CreateProductFormValues>
        onSubmit={handleCreateProduct}
        className={styles.form}
        contextValue={formContextValue}
      >
        <h2>Add a new product</h2>
        <span
          aria-live="polite"
          className={isSuccess ? styles.success : styles.error}
        >
          {isSuccess ? API_SUCCESS.PRODUCT_CREATED : errorMessage}
        </span>
        {inputs.map(({ name, label, required, type }) => (
          <FormField
            key={name}
            name={name}
            label={label}
            required={required}
            render={({ name, errorId, placeholder }) => (
              <TextField
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                aria-describedby={errorId}
              />
            )}
          />
        ))}
        <FormField
          name="category.name"
          label="Category"
          required
          render={({ name, errorId = "" }) => (
            <Search
              {...searchProps}
              name={name}
              onInputChange={(value) => {
                if (searchProps.value) return;

                formContextValue.setValue(
                  "category",
                  {
                    id: -1,
                    name: value,
                    value,
                    label: value,
                  },
                  {
                    shouldDirty: true,
                    shouldValidate: true,
                  }
                );
              }}
              onChange={(value) => {
                if (!value || !value.name) return;

                formContextValue.setValue("category", value);
                searchProps.onChange(value);
              }}
            />
          )}
        />
        <Button type="submit" className={styles.submit} isLoading={isLoading}>
          Create product
        </Button>
      </Form>
    </Sidebar>
  );
}
