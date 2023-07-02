/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/
  // "*": true,
  // public endpoint
  "admin/login": true,

  // admin
  "admin/*": "is-platform-admin",

  // users
  "user/*": "is-logged-in",

  // organization
  // "organization/*": "is-org-member",
  "organization/form/*": "is-form-request",

  // responses
  "response/*": "is-form-response",

  // plugins
  "plugins/list": "is-public-endpoint",
  "plugins/auth/*": "is-from-plugin",
};
