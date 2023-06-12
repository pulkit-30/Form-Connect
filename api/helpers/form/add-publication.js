module.exports = {
  friendlyName: "publication",

  description: "publish form for an organization.",

  inputs: {
    orgId: {
      type: "string",
      required: true,
    },
    form: {
      type: "string",
      required: true,
    },
    userId: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      defaultsTo: sails.config.globals.PUBLICATION_STATUS.DRAFT,
      isIn: Object.values(sails.config.globals.PUBLICATION_STATUS),
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function ({ orgId, form, userId, status }) {
    let data = {
      status,
    };
    let publication = await Publications.findOne({
      form,
      organization: orgId,
    });
    if (status === sails.config.globals.PUBLICATION_STATUS.PUBLISHED) {
      const token = await sails.helpers.tokens.getToken(
        { orgId, form },
        sails.config.globals.PUBLISH_FORM_TOKEN_SECRET,
        sails.config.globals.PUBLISH_FORM_TOKEN_EXPIRY
      );
      data.token = token;
    }
    if (publication) {
      await Publications.updateOne({
        form,
        organization: orgId,
      }).set(data);
    } else {
      publication = await Publications.create({
        ...data,
        form,
        organization: orgId,
        meta: {
          lastUpdatedBy: userId,
          createdBy: userId,
          name: form.name,
          description: form.description,
        },
      }).fetch();
    }
    await Forms.updateOne({ id: form }).set({
      publication: publication.id,
    });
  },
};
