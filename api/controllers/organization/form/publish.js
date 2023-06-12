module.exports = {
  friendlyName: "publish",
  description: "publish form.",
  inputs: {
    orgId: {
      type: "string",
      required: true,
    },
    form: {
      type: "json",
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

  fn: async function ({ orgId, form }, exits) {
    try {
      let formData = null;
      if (form.id) {
        formData = await Forms.findOne({
          id: form.id,
        });
      }

      if (formData) {
        // if form exists, update it
        const { success, message, updatedForm, updatedFields } =
          await sails.helpers.form.update(orgId, form, this.req.me.id);

        if (!success) {
          // if form update fails, return error
          return exits.badRequest({
            message,
          });
        }

        // logic to delete all unnecessary fields
        const fields = await Fields.find({
          form: updatedForm.id,
        });

        // get all field ids
        const fieldIds = fields.map((field) => field.id);

        // get all fields that are not in updated fields
        const fieldsToDelete = fieldIds.filter(
          (fieldId) => !updatedFields.includes(fieldId)
        );

        // delete fields
        await Fields.destroy({
          id: fieldsToDelete,
        });

        formData = updatedForm;
      } else {
        // if form does not exist, create it
        const { success, message, newForm } = await sails.helpers.form.create(
          orgId,
          form,
          this.req.me.id
        );

        if (!success) {
          return exits.badRequest({
            message,
          });
        }
        formData = newForm;
      }
      // save as draft
      await sails.helpers.form.addPublication(
        orgId,
        formData.id,
        this.req.me.id,
        sails.config.globals.PUBLICATION_STATUS.PUBLISHED
      );

      return exits.success({
        message: "Form archived successfully.",
      });
    } catch (err) {
      return exits.badRequest({
        message: "form creation failed.",
      });
    }
  },
};
