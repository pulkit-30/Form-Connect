module.exports = {
  friendlyName: "get user",
  description: "Look up the specified user and authorise them.",
  inputs: {},
  exits: {
    success: {
      responseType: "success",
      description: "user details found successfully.",
    },
  },

  fn: async function ({}, exits) {
    return exits.success(this.req.me);
  },
};
