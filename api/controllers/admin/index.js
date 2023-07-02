module.exports = {
  friendlyName: "index",

  description: "",

  inputs: {},

  exits: {
    success: {
      responseType: "success",
      description: "All good.",
    },
    badRequest: {
      responseType: "badRequest",
      description: "something went wrong.",
    },
  },

  fn: async function ({}, exits) {
    try {
      const data = {};
      data.orgs = await Organizations.count();
      data.users = await Users.count();
      data.forms = await Forms.count();
      data.responses = await Responses.count();
      data.plugins = await Plugins.count();
      return exits.success(data);
    } catch (error) {
      console.log(error);
      return exits.badRequest({
        message: error.message || "something went wrong.",
      });
    }
  },
};
