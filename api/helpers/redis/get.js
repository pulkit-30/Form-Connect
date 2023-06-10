// Can be called by running `sails.helpers.redis.set(key<string>, isJson[true|false])`
module.exports = {
  friendlyName: 'Get key',

  description: 'Get redis key.',

  inputs: {
    key: {
      type: 'string',
      required: true
    },
    isJson: {
      type: 'boolean',
      defaultsTo: false
    }
  },

  exits: {
    success: {
      description: 'Getting key successfull'
    }
  },

  fn: async function ({ key, isJson }) {
    let data = await sails.config.redisClient.get(key);
    if (isJson) {
      try {
        data = JSON.parse(data);
      } catch (err) {
        await sails.helpers.sentry.error(err, {
          component: 'helpers-redis-get'
        });
      }
    }
    return data;
  }
};
