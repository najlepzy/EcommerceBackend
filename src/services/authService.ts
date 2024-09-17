import User from "../models/userModel";
import jwt from "jsonwebtoken";

export const registerUser = async (userData: any) => {
  const {
    firstName,
    lastName,
    email,
    age,
    password,
    role = "user",
    cart,
  } = userData;

  if (!firstName || !lastName || !email || !age || !password) {
    throw new Error("All fields except cart are required.");
  }

  const user = new User({
    firstName,
    lastName,
    email,
    age,
    password,
    cart,
    role,
  });

  await user.save();
  return "User registered";
};

export const generateToken = (user: any) => {
  const token = jwt.sign({ id: user._id }, "YOUR_SECRET_KEY", {
    expiresIn: "1h",
  });

  return token;
};

export const getUserData = (user: any) => {
  const { firstName, lastName, email, age, role } = user;
  return { firstName, lastName, email, age, role };
};
