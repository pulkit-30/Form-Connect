module.exports = {
  friendlyName: "get",
  description: "get form.",
  inputs: {
    orgId: {
      type: "string",
      required: true,
    },
    formId: {
      type: "string",
      required: true,
    },
  },
  exits: {
    success: {
      responseType: "success",
      description: "form retrieved successfully.",
    },
    badRequest: {
      responseType: "badRequest",
      description: "form not found.",
    },
  },

  fn: async function ({ orgId, formId }, exits) {
    const form = await Forms.findOne({
      id: formId,
      organization: orgId,
    })
      .populate("fields")
      .populate("publication");

    return exits.success(form);
  },
};
