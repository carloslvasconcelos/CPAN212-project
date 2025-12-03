import jwt from "jsonwebtoken";

export const encodeToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
