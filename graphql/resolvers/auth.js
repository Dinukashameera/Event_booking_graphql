const { User } = require("../../model/user");
const { dateToString } = require("../../helpers/date");
const bcrypt = require("bcryptjs");

module.exports = {
  //create users
  createUser: async (args) => {
    try {
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
};
