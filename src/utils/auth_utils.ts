import bcrypt from "bcrypt";
import rod13 from "./rod13";

import { reverseString } from "./reverse";

export const encrypt = async (password: string | String) => {
  // Encrypt password
  const encPass = await bcrypt.hash(
    Buffer.from(password).toString("base64url"),
    5
  );
  const reversed = reverseString(encPass);
  const encoded = Buffer.from(reversed).toString("base64");
  const endPass = rod13(encoded);

  return endPass;
};

export const validate = async (
  password: string | String,
  dbPassword: string | String
) => {
  const deROD13 = rod13(dbPassword);
  const deBase64 = Buffer.from(deROD13, "base64url").toString();
  const compareWith = reverseString(deBase64);
  const compare = Buffer.from(password).toString("base64url");
  const isValidated = await bcrypt.compare(compare, compareWith);

  return isValidated;
};
