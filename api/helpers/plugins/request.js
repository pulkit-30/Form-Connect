const axios = require("axios");
module.exports = {
  friendlyName: "handel request",

  inputs: {
    req: {
      type: "json",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function ({ req }) {
    if (!req.formId) {
      return { error: "formId is required" };
    }
    const allPlugins = await FormPlugins.find({ form: req.formId }).populate(
      "plugin"
    );
    try {
      for (const { plugin, organization } of allPlugins) {
        await axios(plugin.callbackUrl, {
          method: "POST",
          data: {
            ...req,
            type: "responseData",
            form: req.formId,
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
