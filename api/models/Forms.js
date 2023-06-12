/**
 * Forms.js
 *
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: "string",
      required: true,
      description: "Name of the org form.",
    },
    description: {
      type: "string",
      required: true,
      description: "Description of the org form.",
    },
    meta: {
      type: "json",
      defaultsTo: {},
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    organization: {
      model: "organizations",
      required: true,
      description: "The organization that owns this form.",
    },
    fields: {
      collection: "fields",
      via: "form",
      description: "The fields that belong to this form.",
    },
    responses: {
      collection: "responses",
      via: "form",
      description: "The responses that belong to this form.",
    },
    publication: {
      model: "publications",
      description: "The publications that belong to this form.",
    },
    plugins: {
      collection: "formplugins",
      via: "form",
      description: "The plugins that belong to this form.",
    },
  },
};
