module.exports = {
  friendlyName: "update",

  description: "update form for an organization.",

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
      const updatedFields = [];
      const { success, message } = await sails.helpers.form.validation(form);

      if (!success) {
        return {
          success: false,
          message,
        };
      }

      // update form
      const updatedForm = await Forms.updateOne({
        id: form.id,
        organization: orgId,
      }).set({
        name: form.name,
        description: form.description,
        meta: {
          form: form.meta.createdBy,
          lastUpatedBy: userId,
        },
      });

      // update fields
      for (const field of form.fields) {
        // find or create field
        const fieldId = field.id;
        delete field.id;
        delete field.form;

        const fieldData = await Fields.findOrCreate(
          {
            id: fieldId,
          },
          { ...field, form: updatedForm.id }
        );

        //  update field
        await Fields.updateOne({
          id: fieldData.id,
        }).set({
          ...field,
          meta: {
            createdBy: fieldData.meta.createdBy,
            lastUpatedBy: userId,
          },
        });

        updatedFields.push(fieldData.id);
      }

      return {
        success: true,
        message: "form created successfully.",
        updatedForm,
        updatedFields,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  },
};
