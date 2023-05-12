import * as bcrypt from "bcrypt";

export const passwordHash = async (password: string): Promise<string> => {
  try {
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    return hashedPassword;
  } catch (err) {
    throw new Error("Hashing error");
  }
};

export const passwordCompare = async (password: string, hashedPwd: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPwd);
  } catch (err) {
    throw new Error("Password error");
  }
};
