import { Role } from "../enums";
import { User } from "./user.interface";

export interface ShoppingListUser {
  user: User;
  role: Role;
  id: number;
}
