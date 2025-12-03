import bcrypt from "bcryptjs";

export const encodePassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const matchPassword = (raw, hash) => {
  return bcrypt.compareSync(raw, hash);
};
