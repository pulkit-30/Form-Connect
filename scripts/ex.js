module.exports = {
  friendlyName: "mig",
  inputs: {},

  fn: async function () {
    await Plugins.create({
      name: "Google Sheets",
      icon: "https://img.icons8.com/color/48/000000/google-sheets.png",
      description: "Integrate Google Sheets with your form.",
      callbackUrl: "http://localhost:8080/v1/callback/",
      authCallbackUrl: "http://localhost:8080/v1/auth/",
      clientSecret: await sails.helpers.generateUuid(),
    });
  },
};
