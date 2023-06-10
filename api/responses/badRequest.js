module.exports = async function badRequest(data) {
  var res = this.res;

  sails.log.verbose("Ran custom response: res.notFound()");

  // If you want to log error in sentry, pass `error` object in data. Else pass `message` string.
  if (data) {
    return res.status(400).send({
      success: false,
      error: data,
    });
  }
  return res.status(400).send({
    success: false,
    error: { message: "Bad Request" },
  });
};
