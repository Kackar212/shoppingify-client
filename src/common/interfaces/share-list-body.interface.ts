import { Role } from "../enums";

export interface ShareListBody {
  id: number;
  users: Array<{ email: string; role: Role }>;
}
