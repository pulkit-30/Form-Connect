module.exports = async function (req, res, proceed) {
  if (req.method === "POST") {
    await sails.helpers.plugins.request(req.body, "formUpdate");
  }

  return proceed();
};
