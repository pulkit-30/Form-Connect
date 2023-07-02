module.exports = {
  friendlyName: "admin route",

  description: "get all mongodb admin data.",

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
      // const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      // find previous 7 days form creation data

      const formCreationData = await Forms.find({
        createdAt: {
          ">": new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
        },
      });

      const data = formCreationData.reduce(
        (data, form) => {
          const date = new Date(form.createdAt);
          data[date.getDay()] += 1;

          return data;
        },
        [0, 0, 0, 0, 0, 0, 0]
      );
      return exits.success(data);
    } catch (error) {
      return exits.badRequest({
        message: error.message || "something went wrong.",
      });
    }
  },
};
