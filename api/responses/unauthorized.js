/**
 * unauthorized.js
 *
 * A custom response that content-negotiates the current request to either:
 *  • log out the current user and redirect them to the login page
 *  • or send back 401 (Unauthorized) with no response body.
 *
 * Example usage:
 * ```
 *     return res.unauthorized();
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       badCombo: {
 *         description: 'That email address and password combination is not recognized.',
 *         responseType: 'unauthorized'
 *       }
 *     }
 * ```
 */
module.exports = function unauthorized() {
  var req = this.req;
  var res = this.res;

  sails.log.verbose("Ran custom response: res.unauthorized()");

  if (req.wantsJSON) {
    return res.status(401).send({
      success: false,
      error: { message: "Unauthorized" },
    });
  }
  // Or log them out (if necessary) and then redirect to the login page.
  else {
    return res.status(401).json({
      success: false,
      error: { message: "UnAuthorized" },
    });
  }
};
