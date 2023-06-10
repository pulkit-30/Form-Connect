module.exports = function success(data) {
  var req = this.req;
  var res = this.res;

  sails.log.verbose("Ran custom response: res.notFound()");

  if (req.wantsJSON) {
    if (data) {
      return res.status(200).send({
        success: true,
        data: data,
      });
    }
    return res.status(200).send({
      success: true,
      data: { message: "The request submitted successfully" },
    });
  }
  // Or log them out (if necessary) and then redirect to the login page.
  else {
    return res.status(200).send({
      success: true,
      data: { message: "The request submitted successfully" },
    });
  }
};
