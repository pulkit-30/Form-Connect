const { v4: uuidv4 } = require("uuid");

module.exports = {
  friendlyName: "Generate uuid",

  inputs: {},

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function ({}) {
    const uuid = uuidv4();
    return uuid;
  },
};
