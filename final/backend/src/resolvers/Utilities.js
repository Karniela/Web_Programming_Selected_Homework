import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const SECRET = "2023happynewyear";

export const hash = async (pwd) => (await bcrypt.hash(pwd, saltRounds));
export const checkPwd = async (pwd, hash) => (await bcrypt.compare(pwd, hash));
export const initUserInfo = async (input) => { // warning: this function might affect the input
  input.hashed_pwd = await hash(input.pwd);
  delete input.pwd;
  return input;
}
export const newToken = (user) => (jwt.sign({ _id: user._id.toString() }, SECRET, {expiresIn: '1 day'}));
export const verifyToken = (token) => (jwt.verify(token, SECRET));