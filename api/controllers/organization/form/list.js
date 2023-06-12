module.exports = {
  friendlyName: "list",
  description: "Look up a user's organization form",
  inputs: {
    orgId: {
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
      description: "form not found.",
    },
  },

  fn: async function ({ orgId }, exits) {
    const forms = await Forms.find({ organization: orgId })
      .populate("responses")
      .populate("publication")
      .populate("plugins");

    return exits.success(forms);
  },
};
