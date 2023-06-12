module.exports = async function (req, res, proceed) {
  if (req.me) {
    // check for the user's organization

    const role = await UserOrgRoles.findOne({
      user: req.me.id,
      organization: req.params.orgId,
    });

    if (role) {
      return proceed();
    }
  }

  //--•
  // Otherwise, this request did not come from a logged-in user.
  return res.unauthorized();
};
