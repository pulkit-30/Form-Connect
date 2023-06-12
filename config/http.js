/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {
  /****************************************************************************
   *                                                                           *
   * Sails/Express middleware to run for every HTTP request.                   *
   * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
   *                                                                           *
   * https://sailsjs.com/documentation/concepts/middleware                     *
   *                                                                           *
   ****************************************************************************/

  middleware: {
    /***************************************************************************
     *                                                                          *
     * The order in which middleware should be run for HTTP requests.           *
     * (This Sails app's routes are handled by the "router" middleware below.)  *
     *                                                                          *
     ***************************************************************************/

    order: [
      "jwtAuth",
      "pluginAuth",
      // "cookieParser",
      // "session",
      "bodyParser",
      // "compress",
      // "poweredBy",
      // "router",
      // "www",
      // "favicon",
    ],

    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests.       *
     *                                                                          *
     * https://sailsjs.com/config/http#?customizing-the-body-parser             *
     *                                                                          *
     ***************************************************************************/

    bodyParser: function (req, res, next) {
      var skipper = require("skipper")();
      var rawParser = require("body-parser").raw({ type: "*/*" });
      if (req.headers && req.headers["stripe-signature"]) {
        return rawParser(req, res, next);
      }
      return skipper(req, res, next);
    },

    jwtAuth: (function () {
      return async function (req, res, next) {
        if (req.headers && req.headers.authorization) {
          const parts = req.headers.authorization.split(" ");
          if (parts.length === 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
              const token = credentials;

              if (token) {
                const data = await sails.helpers.tokens.verifyToken(token);
                if (!data) {
                  return next();
                }

                const loggedInUser = await Users.findOne({
                  id: data.user,
                }).populate("roles");

                if (!loggedInUser) {
                  return next();
                }

                // await Tokens.setExpiry({
                //   user: loggedInUser.id,
                //   token,
                //   seconds:
                //     sails.config.globals.userSessionInvalidateLimitSeconds,
                // });
                // let tokenData = null;

                const tokenData = await Tokens.findOne({
                  user: data.user,
                  token,
                });

                if (!tokenData) {
                  return next();
                }
                req.me = loggedInUser;
              }
            }
          }
        }

        return next();
      };
    })(),
    pluginAuth: (function () {
      return async function (req, res, next) {
        const { "client-secret": clientSecret } = req.headers;
        if (clientSecret) {
          const plugin = await Plugins.findOne({ clientSecret });
          req.plugin = plugin;
          if (plugin) {
            return next();
          }
        }
        //--•
        // Otherwise, this request did not come from a logged-in user.
        return next();
      };
    })(),
  },
};
