import { useCallback, useEffect } from "react";
import { FormFieldInput } from "../../common/interfaces/form-field-input.interface";
import { searchCategories, useCreateProductMutation } from "../../features/api";
import { FormField } from "../form-field/form-field.component";
import { Form } from "../form/form.component";
import { Search } from "../search/search.component";
import { useSearch } from "../../hooks/useSearch";
import { TextField } from "../text-field/text-field.component";
import styles from "./create-product-form.module.scss";
import { CreateProductBody } from "../../common/interfaces/create-product-body.interface";
import { Category } from "../../common/interfaces/category.interface";
import { Button } from "../button/button.component";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VALIDATION_MODE_ALL } from "../../common/constants";
import { Error } from "../error/error.component";
import { Sidebar } from "../sidebar/sidebar.component";

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

const createProductSchema = yup
  .object({
    name: yup.string().min(3).max(50).required(),
    note: yup.string().max(255),
    image: yup.string().url(),
    category: yup
      .object({
        id: yup.number().integer().optional(),
        name: yup
          .string()
          .min(3, "Category must be at least 3 characters")
          .max(80, "Category must be at most 80 characters")
          .required("You must select category or create new!"),
      })
      .required("You must select category or create new!"),
  })
  .required();

export function CreateProductForm() {
  const [searchCategoriesByName, queryState] = searchCategories.useLazyQuery();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const searchProps = useSearch({ query: searchCategoriesByName, queryState });
  const formContextValue = useForm<CreateProductBody>({
    resolver: yupResolver(createProductSchema),
    mode: VALIDATION_MODE_ALL,
  });

  useEffect(() => {
    const isDirty = !!formContextValue.formState.dirtyFields.category;
    const category = searchProps.value as Omit<Category, "products">;

    formContextValue.setValue("category", category, {
      shouldValidate: !!searchProps.value || isDirty,
      shouldDirty: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchProps.value]);

  const handleCreateProduct = useCallback(
    async (createProductBody: CreateProductBody) => {
      if (isLoading) return;

      await createProduct(createProductBody).unwrap();

      formContextValue.reset();
      searchProps.reset();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading]
  );

  return (
    <Sidebar>
      <Form
        onSubmit={handleCreateProduct}
        className={styles.form}
        contextValue={formContextValue}
      >
        <h2>Add a new product</h2>
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
        <Controller
          name="category"
          control={formContextValue.control}
          render={({ field }) => (
            <FormField
              name="category"
              label="Category"
              required
              render={({ name, errorId = "" }) => (
                <>
                  <Error name="category.name" errorId={errorId} />
                  <Search {...searchProps} {...field} name={name} />
                </>
              )}
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
