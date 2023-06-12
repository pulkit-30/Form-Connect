/**
 * Fields.js
 *
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    label: {
      type: "string",
      required: true,
      description: "Name of the org form.",
    },
    description: {
      type: "string",
      required: true,
      description: "Description of the org form.",
    },
    isRequired: {
      type: "boolean",
      defaultsTo: false,
      description: "Is this field required?",
    },
    placeholder: {
      type: "string",
      defaultsTo: "",
      description: "Placeholder text for the field.",
    },
    defaultValue: {
      type: "string",
      defaultsTo: "",
      description: "Default value for the field.",
    },
    type: {
      type: "string",
      isIn: Object.values(sails.config.globals.FIELD_TYPES),
      required: true,
      description: "Type of the field.",
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
    form: {
      model: "forms",
      required: true,
      description: "The form that owns this field.",
    },
  },
};
