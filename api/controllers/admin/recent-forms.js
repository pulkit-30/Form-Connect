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
      // find pas 10 days forms
      const recentForms = await Forms.find({
        where: {
          createdAt: {
            ">=": new Date(new Date() - 10 * 60 * 60 * 24 * 1000),
          },
        },
      })
        .populate("organization")
        .populate("publication");
      return exits.success(recentForms.reverse());
    } catch (error) {
      console.log(error);
      return exits.badRequest({
        message: error.message || "something went wrong.",
      });
    }
  },
};
