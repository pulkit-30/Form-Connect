// register new user
module.exports = {
  friendlyName: "register user",

  description: "register new user",

  inputs: {
    fullName: {
      type: "string",
      required: true,
      maxLength: 120,
    },
    email: {
      type: "string",
      required: true,
      isEmail: true,
      maxLength: 200,
    },
    password: {
      type: "string",
      required: true,
    },
    orgName: {
      type: "string",
      required: true,
    },
    orgCategory: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      responseType: "success",
      description: "user registered successfully.",
    },
    badRequest: {
      responseType: "badRequest",
      description: "request invalid.",
    },
  },

  fn: async function (
    { fullName, email, password, orgName, orgCategory, role },
    exits
  ) {
    try {
      // check for existing organization
      const existingOrganization = await Organizations.findOne({
        name: orgName,
      });
      if (existingOrganization) {
        return exits.badRequest({
          message: "Organization with same name already exists.",
        });
      }
      // check for existing user
      const existingUser = await Users.findOne({
        email,
      });
      if (existingUser) {
        return exits.badRequest({
          message: "User already exists.",
        });
      }

      // create new organization
      const newOrganization = await Organizations.create({
        name: orgName,
        category: orgCategory,
        meta: {
          createdBy: email,
        },
      }).fetch();

      const hashedPassword = await sails.helpers.passwords.hashPassword(
        password
      );
      // create new user
      const newUser = await Users.create({
        fullName,
        email,
        password: hashedPassword,
        meta: {
          primaryOrganization: newOrganization.id,
        },
      }).fetch();

      // create new user organization role
      await UserOrgRoles.create({
        role,
        organization: newOrganization.id,
        user: newUser.id,
      }).fetch();

      // perform login
      // generate token
      const token = await sails.helpers.tokens.getToken({
        user: newUser.id,
      });

      // store tokem top redis db
      await Tokens.create({ user: newUser.id, token });

      return exits.success({
        token,
        user: newUser,
      });
    } catch (error) {
      return exits.badRequest({
        message: error.message || "something went wrong.",
      });
    }
  },
};
