module.exports = function notFound(message) {
  var req = this.req;
  var res = this.res;

  sails.log.verbose("Ran custom response: res.notFound()");

  if (req.wantsJSON) {
    return res.status(404).send({
      success: false,
      error: { message: message || "NotFound" },
    });
  }
  // Or log them out (if necessary) and then redirect to the login page.
  else {
    if (req.session.userId) {
      delete req.session.userId;
    }

    return res.view("404");
  }
};
