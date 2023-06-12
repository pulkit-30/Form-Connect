module.exports = {
  friendlyName: "create",

  description: "create form for an organization.",

  inputs: {
    orgId: {
      type: "string",
      required: true,
    },
    form: {
      type: "json",
      required: true,
    },
    userId: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function ({ orgId, form, userId }) {
    try {
      const { fields, name, description } = form;
      const { success, message } = await sails.helpers.form.validation(form);

      if (!success) {
        return {
          success: false,
          message,
        };
      }

      //   create form
      const newForm = await Forms.create({
        name,
        description,
        organization: orgId,
        meta: {
          createdBy: userId,
          lastUpatedBy: userId,
        },
      }).fetch();

      //   create fields
      for (const { id, form, ...rest } of fields) {
        await Fields.create({
          ...rest,
          form: newForm.id,
          meta: {
            createdBy: userId,
            lastUpatedBy: userId,
          },
        });
      }

      return {
        success: true,
        message: "form created successfully.",
        newForm,
      };
    } catch (error) {
      return {
        success: false,
        message: "form creation failed.",
      };
    }
  },
};
