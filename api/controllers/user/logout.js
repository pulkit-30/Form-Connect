// logout user
module.exports = {
  friendlyName: "Logout",

  inputs: {
    token: {
      description: "The token that is to be revoked.",
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      responseType: "success",
      description:
        "The requesting user agent has been successfully logged out.",
    },
    badRequest: {
      responseType: "badRequest",
      statusCode: 400,
    },
  },

  fn: async function ({ token }, exits) {
    let tokenRecord = await Tokens.findOne({ user: this.req.me.id, token });

    if (!tokenRecord) {
      return exits.badRequest({
        message: "Token not found.",
      });
    }
    const data = await sails.helpers.tokens.verifyToken(token);

    if (data.user !== this.req.me.id) {
      return exits.badRequest({
        message: "You can not logout this token.",
      });
    }

    await Tokens.destroy({ user: this.req.me.id, token });

    return exits.success({
      message: "Successfully logged out.",
    });
  },
};
