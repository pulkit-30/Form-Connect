/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: "username@example.com",
      description: "Email address of the user.",
    },
    password: {
      type: "string",
      protect: true,
      example: "2$28a8eabna301089103-13948134nad",
      description:
        "Securely hashed representation of the user's login password.",
    },
    fullName: {
      type: "string",
      maxLength: 120,
      example: "Mary Sue van der McHenst",
      description: "Full representation of the user's name.",
    },
    forgotPasswordJwt: {
      type: "string",
      description: "to store jwt strings to store and verify forgot password ",
      allowNull: true,
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    roles: {
      collection: "userorgroles",
      via: "user",
      description: "users role in the organization.",
    },
  },
  customToJSON: function () {
    return _.omit(this, [
      "password",
      "createdAt",
      "updatedAt",
      "forgotPasswordJwt",
    ]);
  },
};
