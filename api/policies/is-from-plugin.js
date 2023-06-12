/**
 * is-logged-in
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {
  const { "client-secret": clientSecret } = req.headers;
  if (clientSecret && req.plugin && req.plugin.id) {
    return proceed();
  }
  //--•
  // Otherwise, this request did not come from a logged-in user.
  return res.unauthorized();
};
