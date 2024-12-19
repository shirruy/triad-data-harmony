import { UserRole } from "./types";
import { ROLE_KEYS } from "./constants";

export const validateRegistrationKey = (role: UserRole, key: string): boolean => {
  return ROLE_KEYS[role] === key;
};