const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Generate new jwt token",

  description: "this is to generate jwt token",

  inputs: {
    payload: {
      type: "json",
      required: true,
    },
    secret: {
      type: "string",
      defaultsTo: sails.config.authJwtSecret,
    },
    expiresIn: {
      type: "string",
      defaultsTo: "1h",
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function ({ payload, secret, expiresIn }) {
    const token = jwt.sign(payload, secret, {
      expiresIn,
    });
    return token;
  },
};
