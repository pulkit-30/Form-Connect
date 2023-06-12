module.exports = {
  friendlyName: "list",
  description: "list all available plugins.",
  inputs: {},
  exits: {
    success: {
      responseType: "success",
      description: "user details found successfully.",
    },
    badRequest: {
      responseType: "badRequest",
      description: "The provided token is invalid.",
    },
  },

  fn: async function ({}, exits) {
    const plugins = await Plugins.find({});
    return exits.success(plugins);
  },
};
