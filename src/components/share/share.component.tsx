import Image from "next/image";
import styles from "./share.module.scss";
import Select, { SingleValue } from "react-select";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import shareIcon from "/public/assets/images/share.svg";
import { Modal } from "../modal/modal.component";
import { Role } from "../../common/enums";
import { PlusIcon } from "../plus-icon/plus-icon.component";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import { FormField } from "../form-field/form-field.component";
import { Input } from "../input/input.component";
import { useShareListMutation } from "../../features/api";
import { ShoppingListUser } from "../../common/interfaces/shopping-list-user.interface";
import * as yup from "yup";
import { ShareListBody } from "../../common/interfaces/share-list-body.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader } from "../loader/loader.component";
import { User } from "../../common/interfaces/user.interface";
import { useKeepMutationData } from "../../hooks/useKeepMutationData";
import { ShoppingList } from "../../common/interfaces/shopping-list.interface";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/slices/auth.slice";
import { VALIDATION_MODE_ALL } from "../../common/constants";
import { Error } from "../error/error.component";

const isEmail = (value: string) => {
  return yup.string().email().isValidSync(value);
};

type RoleOption = { value: Role; label: Role };
type FormValues = { emailOrName: string; role: RoleOption };

const roles = Object.values(Role)
  .filter((role) => role !== Role.Owner)
  .map<RoleOption>((role) => ({
    value: role,
    label: role,
  }));

const yupSchema = yup
  .object({
    emailOrName: yup.string().min(3).max(255).required().label("name"),
    role: yup.object({
      value: yup.string().oneOf(Object.values(Role)).required().label("role"),
    }),
  })
  .required();

interface ShareProps {
  id: number;
  authorizedUsers: ShoppingListUser[];
  owner: User;
}

export function Share({ id, authorizedUsers, owner }: ShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shareListMutation, { data: shoppingList, isLoading, error }] =
    useShareListMutation();
  const formMethods = useForm<FormValues>({
    resolver: yupResolver(yupSchema),
    mode: VALIDATION_MODE_ALL,
  });
  const persistentData = useKeepMutationData<ShoppingList | undefined>(
    shoppingList?.data,
    {}
  );
  const { user: currentUser } = useSelector(selectAuth);
  const users = persistentData.current?.authorizedUsers || authorizedUsers;

  useEffect(() => {
    if (error && "status" in error && error.status === 400) {
      formMethods.setError("emailOrName", {
        message: "User doesn't exists or data is invalid!",
      });
    }
  }, [error, formMethods]);

  const toggle = () => setIsOpen((isOpen) => !isOpen);

  const share = async (data: FormValues) => {
    const userWithEmail = {
      email: data.emailOrName,
      role: data.role.value,
    };

    const userWithName = {
      name: data.emailOrName,
      role: data.role.value,
    };

    const user = isEmail(data.emailOrName) ? userWithEmail : userWithName;

    const body: ShareListBody = { users: [user], id };

    await shareListMutation(body);
  };

  const changeRole = (user: User) => (option: SingleValue<RoleOption>) => {
    if (!option) return option;

    const { value: role } = option;

    shareListMutation({
      users: [{ role, name: user.name }],
      id,
    });

    return option;
  };

  const removeAccess = (user: User) => () => {
    shareListMutation({
      users: [{ name: user.name }],
      id,
    });
  };

  return (
    <div>
      <button onClick={toggle} className={styles.share}>
        Share <Image src={shareIcon} alt="" />
      </button>
      <Modal isOpen={isOpen} close={toggle}>
        <div>
          {isLoading && (
            <div className={styles.loaderContainer}>
              <Loader size={35} />
            </div>
          )}
          <button className={styles.closeButton} onClick={toggle}>
            <PlusIcon />
            <VisuallyHidden>Close</VisuallyHidden>
          </button>
          <form onSubmit={formMethods.handleSubmit(share)}>
            <FormProvider {...formMethods}>
              <div>
                <div className={styles.rowBetween}>
                  <FormField
                    name="emailOrName"
                    label="User email or name"
                    required={true}
                    className={styles.field}
                    render={({ name, errorId, placeholder }) => {
                      return (
                        <Input
                          name={name}
                          id={name}
                          aria-describedby={errorId}
                          placeholder={placeholder}
                          className={styles.input}
                        />
                      );
                    }}
                  />
                  <Controller
                    name="role"
                    control={formMethods.control}
                    render={({ field }) => (
                      <FormField
                        name={field.name}
                        label="Role"
                        required
                        className={styles.field}
                        render={({ errorId, name }) => (
                          <>
                            {errorId && (
                              <Error name="role.value" errorId={errorId} />
                            )}
                            <Select<any>
                              options={roles}
                              inputId={name}
                              placeholder="Select a role"
                              aria-describedby={errorId}
                              isSearchable={false}
                              classNames={{
                                container: () => styles.role,
                              }}
                              {...field}
                            />
                          </>
                        )}
                      />
                    )}
                  />
                </div>
                <button type="submit" className={styles.submit}>
                  Add
                </button>
              </div>
              <h3>Shared with</h3>
              <div className={styles.users}>
                {users.map(({ user, role }) => (
                  <div key={user.name} className={styles.user}>
                    <div className={styles.rowBetween}>
                      <label htmlFor={user.name} className={styles.name}>
                        <VisuallyHidden>Username: </VisuallyHidden>
                        {user.name} {currentUser?.id === user.id && "(you)"}
                      </label>
                      <Select
                        options={roles}
                        value={{ value: role, label: role }}
                        inputId={user.name}
                        onChange={changeRole(user)}
                        isSearchable={false}
                        isDisabled={user.id === owner.id}
                        classNames={{
                          container: () => styles.role,
                        }}
                      />
                    </div>
                    {user.id !== owner.id && (
                      <button
                        type="button"
                        className={styles.unshare}
                        onClick={removeAccess(user)}
                      >
                        Unshare <Image src={shareIcon} alt="" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </FormProvider>
          </form>
        </div>
      </Modal>
    </div>
  );
}
