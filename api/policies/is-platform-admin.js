module.exports = async function (req, res, proceed) {
  if (req.me) {
    if (req.adminRequest) {
      return proceed();
    }
  }

  //--•
  // Otherwise, this request did not come from a logged-in user.
  return res.unauthorized();
};
