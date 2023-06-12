module.exports = {
  friendlyName: "validate",

  description: "validate form for an organization.",

  inputs: {
    form: {
      type: "json",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function ({ form }) {
    const { name, description, fields } = form;
    let success = true;
    message = "form validated successfully.";
    // validate form
    if (!name || !description || !fields || !fields.length) {
      success = false;
      message = "form validation failed.";
    }
    // validate fields
    fields.forEach((field) => {
      if (!field.label || !field.type || !field.description) {
        success = false;
        message = `invalid ${field.label} field.}`;
      }
    });
    return {
      success,
      message,
    };
  },
};
