const axios = require("axios");
module.exports = {
  friendlyName: "handel request",

  inputs: {
    req: {
      type: "json",
      required: true,
    },
    type: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function ({ req, type }) {
    if (type === "responseData" && !req.formId) {
      return {
        success: false,
        message: "Missing formId",
      };
    }
    const allPlugins =
      ((req.formId || req.form.id) &&
        (await FormPlugins.find({
          form: req.formId || req.form.id,
        }).populate("plugin"))) ||
      [];
    try {
      for (const { plugin, organization } of allPlugins) {
        await axios(plugin.callbackUrl, {
          method: "POST",
          data: {
            data: req,
            type,
            form: req.formId || req.form.id,
            organization: organization,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
    return {
      success: true,
    };
  },
};
