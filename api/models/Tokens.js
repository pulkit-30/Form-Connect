/**
 * Tokens.js
 *
 * Model to store tokens for users.
 */

module.exports = {
  datastore: "redis",
  archiveModelIdentity: false,
  attributes: {
    user: {
      model: "users",
      required: true,
    },
    token: {
      type: "string",
      required: true,
    },
  },
  customToJSON: function () {
    return _.omit(this, ["token", "createdAt", "updatedAt"]);
  },
  destroy: async ({ user, token }) => {
    const key = `${user}-${token}`;
    await sails.config.redisClient.del(key);
  },
  findOne: async ({ user, token }) => {
    console.log(user, token);
    const key = `${user}-${token}`;
    return sails.helpers.redis.get(key);
  },
  create: async ({ user, token }) => {
    const key = `${user}-${token}`;
    return sails.helpers.redis.set(key, user, {
      EX: sails.config.globals.userSessionInvalidateLimitSeconds,
    });
  },

  setExpiry: async ({ user, token, seconds }) => {
    const key = `${user}-${token}`;
    await sails.config.redisClient.expire(key, seconds);
  },

  deleteAllUserTokens: async ({ user, token = undefined }) => {
    let keys = (await sails.config.redisClient.keys(`${user}-*`)) || [];
    if (token) {
      keys = keys.filter((key) => key !== `${user}-${token}`);
    }
    keys.length && (await sails.config.redisClient.del(keys));
  },
};
