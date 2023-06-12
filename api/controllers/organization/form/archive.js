module.exports = {
  friendlyName: "archive",
  description: "archieve form.",
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
      description: "user details found successfully.",
    },
    badRequest: {
      responseType: "badRequest",
      description: "form not found.",
    },
  },

  fn: async function ({ orgId, formId }, exits) {
    await Publications.updateOne({
      form: formId,
      organization: orgId,
    }).set({
      token: "",
      status: sails.config.globals.PUBLICATION_STATUS.ARCHIVED,
    });

    return exits.success({
      message: "Form archived successfully.",
    });
  },
};
