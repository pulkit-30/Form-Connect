/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const organization = "orgId";
const form = "formId";
const formToken = "token";

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },
  "POST /v1/auth/login": { action: "auth/login" },
  "POST /v1/auth/register": { action: "auth/register" },
  "GET /v1/user/me": { action: "user/me" },
  "DELETE /v1/user/logout": { action: "user/logout" },
  "GET /v1/user/organizations": { action: "user/userOrgs/list" },

  // response form routes
  "POST /v1/response/form/": {
    action: "response/form/get",
  },
  // response form routes
  "POST /v1/response/form/save": {
    action: "response/form/save",
  },

  // organization form routes
  [`GET /v1/organization/:${organization}/forms`]: {
    action: "organization/form/list",
  },
  [`GET /v1/organization/:${organization}/form/:${form}`]: {
    action: "organization/form/get",
  },
  [`POST /v1/organization/:${organization}/form/draft`]: {
    action: "organization/form/draft",
  },
  [`POST /v1/organization/:${organization}/form/publish`]: {
    action: "organization/form/publish",
  },
  [`GET /v1/organization/:${organization}/form/:${form}/plugins`]: {
    action: "organization/form/plugins",
  },
  [`DELETE /v1/organization/:${organization}/form/:${form}/archive`]: {
    action: "organization/form/archive",
  },

  // plugins
  "GET /v1/plugins": { action: "plugins/list" },
  // plugin authentication
  "POST /v1/plugin/auth": { action: "plugins/auth/index" },
  // plugin form authentication
  "POST /v1/plugin/form": { action: "plugins/form/index" },

  // admin routes
  "POST /v1/admin/login": { action: "admin/login" },
  "GET /v1/admin/overview": { action: "admin/index" },
  "GET /v1/admin/forms": { action: "admin/forms" },
  "GET /v1/admin/recent": { action: "admin/recent-forms" },

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
