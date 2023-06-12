module.exports = {
  friendlyName: "get",
  description: "Look up the specified user and authorise them.",
  inputs: {
    token: {
      description: "The token to look up.",
      type: "string",
      required: true,
    },
  },
  exits: {
    success: {
      responseType: "success",
      description: "user details found successfully.",
    },
    badRequest: {
      responseType: "badRequest",
      description: "The provided token is invalid.",
    },
  },

  fn: async function ({ token }, exits) {
    // verify token
    const data = await sails.helpers.tokens.verifyToken(
      token,
      sails.config.globals.PUBLISH_FORM_TOKEN_SECRET
    );

    if (!data) {
      return exits.badRequest({
        message: "The provided token is invalid.",
      });
    }
    const { orgId, form } = data;
    const formData = await Forms.findOne({
      id: form,
      organization: orgId,
    })
      .populate("fields")
      .populate("publication");

    if (
      !formData.publication ||
      formData.publication.status !==
        sails.config.globals.PUBLICATION_STATUS.PUBLISHED
    ) {
      return exits.badRequest({
        message: "The provided token is invalid.",
      });
    }

    if (!formData) {
      return exits.badRequest({
        message: "The provided token is invalid.",
      });
    }

    return exits.success(formData);
  },
};
