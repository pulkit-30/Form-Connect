module.exports = {
  friendlyName: "mig",
  inputs: {},

  fn: async function () {
    return await sails.helpers.passwords.hashPassword("123456");
  },
};
