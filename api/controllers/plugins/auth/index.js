module.exports = {
  friendlyName: "auth",
  description: "auth plugins",
  inputs: {
    orgId: {
      type: "string",
      required: true,
      description: "The orgId of the user to look up.",
    },
    email: {
      type: "string",
      required: true,
      description: "The email of the user to look up.",
    },
  },
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

  fn: async function ({ email, orgId }, exits) {
    const user = await Users.findOne({ email });

    if (!user) {
      return exits.badRequest({
        message: "User not found",
      });
    }
    const organization = await Organizations.findOne({ id: orgId });

    if (!organization) {
      return exits.badRequest({
        message: "Organization not found",
      });
    }

    // find role for user in org
    const role = await UserOrgRoles.findOne({
      organization: organization.id,
      user: user.id,
    });

    if (role.role !== sails.config.globals.USER_ROLES.owner) {
      return exits.badRequest({
        message: "User is not an owner",
      });
    }
    return exits.success(organization);
  },
};
