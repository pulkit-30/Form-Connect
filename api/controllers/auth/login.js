module.exports = {
  friendlyName: "logIn user",

  description: "Look up the specified user and authorise them.",

  inputs: {
    email: {
      type: "string",
      required: true,
      isEmail: true,
      maxLength: 200,
    },
    password: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      responseType: "success",
      description: "user login successfully.",
    },
    badRequest: {
      responseType: "badRequest",
      description: "The provided user ID or password are invalid.",
    },
    notFound: {
      description: "No user with the specified ID was found in the database.",
      responseType: "notFound",
    },
  },

  fn: async function ({ email, password }, exits) {
    try {
      // Look up by the email address.
      const user = await Users.findOne({ email });
      if (user) {
        // If a user was found, compare password attempt(s) with the encrypted password
        // from the database.
        await sails.helpers.passwords
          .checkPassword(password, user.password)
          .intercept("incorrect", "badCombo");
        // generate token
        const token = await sails.helpers.tokens.getToken({
          user: user.id,
        });
        // store tokem top redis db
        await Tokens.create({ user: user.id, token });
        //   return response
        return exits.success({ user, token });
      }
      // Display a personalized welcome view.
      return exits.badRequest({
        message: "The provided user ID or password are invalid.",
      });
    } catch (error) {
      return exits.badRequest({
        message: error.message || "something went wrong.",
      });
    }
  },
};
