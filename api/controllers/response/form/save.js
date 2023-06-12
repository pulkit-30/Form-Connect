module.exports = {
  friendlyName: "save",
  description: "save response for the form",
  inputs: {
    response: {
      type: "json",
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
      description: "saved successfully.",
    },
    badRequest: {
      responseType: "badRequest",
      description: "invalid request",
    },
  },

  fn: async function ({ formId, response }, exits) {
    const form = await Forms.findOne({ id: formId })
      .populate("fields")
      .populate("publication");
    if (
      !form ||
      form.publication.status !==
        sails.config.globals.PUBLICATION_STATUS.PUBLISHED
    ) {
      return exits.badRequest({
        message: "currently, form not accepting form.",
      });
    }

    const formFields = form.fields.map((field) => field.label);
    const responseFields = Object.keys(response);
    const isFormValid = formFields.every((field) =>
      responseFields.includes(field)
    );
    if (!isFormValid) {
      return exits.badRequest({
        message: "invalid form response.",
      });
    }

    const responseObj = {
      form: formId,
      response,
      organization: form.organization,
    };
    await Responses.create(responseObj).fetch();

    return exits.success({
      message: "response saved successfully.",
    });
  },
};
