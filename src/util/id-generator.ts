import { randomBytes } from "crypto";

export const genID = (prefix: string = "") => {
  const id = `${randomBytes(6).toString("hex")}`;
  return prefix.length ? `${prefix}_${id}` : id;
};
