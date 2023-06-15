module.exports = async function (req, res, proceed) {
  await sails.helpers.plugins.request(req.body);

  return proceed();
};
