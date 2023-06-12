module.exports = {
  friendlyName: "form",
  description: "get form details.",
  inputs: {
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

  fn: async function ({ formId }, exits) {
    const form = await Forms.findOne({
      id: formId,
    }).populate("publication");

    if (
      !form ||
      form.publication.status ===
        sails.config.globals.PUBLICATION_STATUS.ARCHIVED
    ) {
      return exits.badRequest({
        message: "Form not found or form archived.",
      });
    }
    const alreadyExists = await FormPlugins.findOne({
      form: formId,
      plugin: this.req.plugin.id,
    });
    if (alreadyExists) {
      return exits.badRequest({
        message: "Plugin already installed.",
      });
    }
    // store plugin and form relation in db
    await FormPlugins.create({
      form: formId,
      organization: form.organization,
      plugin: this.req.plugin.id,
    }).fetch();

    return exits.success(form);
  },
};
