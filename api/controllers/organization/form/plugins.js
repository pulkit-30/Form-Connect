module.exports = {
  friendlyName: "form plugins",
  description: "get form plugins details.",
  inputs: {
    orgId: {
      type: "string",
      required: true,
      description: "organization id",
    },
    formId: {
      type: "string",
      required: true,
      description: "form id",
    },
  },
  exits: {
    success: {
      responseType: "success",
      description: "The form details",
    },
    badRequest: {
      responseType: "badRequest",
      description: "The provided token is invalid.",
    },
  },

  fn: async function ({ orgId, formId }, exits) {
    const plugins = await FormPlugins.find({
      form: formId,
      organization: orgId,
    }).populate("plugin");

    return exits.success(plugins);
  },
};
