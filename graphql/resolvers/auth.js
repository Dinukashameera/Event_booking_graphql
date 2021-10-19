const { User } = require("../../model/user");
const { dateToString } = require("../../helpers/date");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  //create users
  createUser: async (args) => {
    try {
      console.log(args)
      const checkUserExist = await User.findOne({ email: args.user.email });
      if (checkUserExist) {
        throw new Error("User already exist");
      } else {
        const hashedPassword = await bcrypt.hash(args.user.password, 12);
        const user = new User({
          email: args.user.email,
          password: hashedPassword,
        });

        let result = await user.save();
        result.password = null;

        return result;
      }
    } catch (error) {
      throw error;
    }
  },

  //logginh
  login: async ({ email, password }) => {
    try {
      const checkUser = await User.findOne({ email: email });
      console.log(checkUser);
      if (!checkUser) {
        throw new Error("User doesnt exist");
      }
      const isEqual = await bcrypt.compare(password, checkUser.password);
      if (!isEqual) {
        throw new Error("Invlaid incorrect");
      }
      const token = jwt.sign(
        {
          userId: checkUser.id,
          email: checkUser.email,
        },
        "sometoken",
        { expiresIn: "1h" }
      );
      return {
        userId: checkUser.id,
        token: token,
        tokenExpiration: 1,
      };
    } catch (error) {
      console.log(error);
    }
  },
};
