// logout user
module.exports = {
  friendlyName: "list",

  inputs: {},

  exits: {
    success: {
      responseType: "success",
      description:
        "The request for list of organizations has been successfully executed",
    },
    badRequest: {
      responseType: "badRequest",
      statusCode: 400,
    },
  },

  fn: async function ({}, exits) {
    const user = this.req.me.id;
    // const organizations = await Organizations.find({ user });
    // return exits.success({
    //   organizations,
    // });
    const userOrgRoles = await UserOrgRoles.find({ user }).populate(
      "organization"
    );
    return exits.success(userOrgRoles);
  },
};
