const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Verify jwt token",

  description: "verify jwt token.",

  inputs: {
    token: {
      type: "string",
      required: true,
    },
    secret: {
      type: "string",
      defaultsTo: sails.config.authJwtSecret,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function ({ token, secret }) {
    try {
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (err) {
      return null;
    }
  },
};
