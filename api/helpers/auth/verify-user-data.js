module.exports = {
  friendlyName: "verify-user-data",

  inputs: {
    fullName: {
      type: "string",
      required: true,
      maxLength: 120,
    },
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
      description: "All done.",
    },
  },

  fn: async function ({ fullName, email, password }) {
    const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!fullNameRegex.test(fullName)) {
      return {
        success: false,
        message: "Invalid full name.",
      };
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Invalid email address.",
      };
    }
    if (await sails.helpers.passwords.checkPasswordStrength(password)) {
      return {
        success: false,
        message: "Password is not strong enough.",
      };
    }
    return {
      success: true,
      message: "User data verified successfully.",
    };
  },
};
