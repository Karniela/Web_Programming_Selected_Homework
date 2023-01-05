import { checkPwd, initUserInfo, newToken } from "./Utilities";

export const Mutation = {
  // addArtist: async (parent, { name }, { Painter }, info) => { // just for testing
  //   const newPainter = new Painter({name});
  //   return await newPainter.save();
  // },
  userSignup: async (parent, { input }, { User }, info) => {
    if (await User.findOne({ email: input.email})) {
      return { message: "Error: This email is already used" };
    }
    const newUser = new User( await initUserInfo(input) );
    await newUser.save();
    return { message: "Sign up successful", token: newToken(newUser) };
  },
  userLogin: async (parent, { email, pwd }, { User }, info) => {
    const user = await User.findOne({ email });
    if (!user) {
      return { message: "Error: This email is not registered yet" };
    }
    if (! await checkPwd(pwd, user.hashed_pwd)) {
      return { message: "Error: Incorrect password" };
    }
    return { message: "Log in successful", token: newToken(user) };
  }
}