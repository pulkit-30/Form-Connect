// Can be called by running `sails.helpers.redis.set(key<string>, value<string|json>)`
module.exports = {
  friendlyName: 'Set data',

  description: 'Set data in redis key.',

  inputs: {
    key: {
      type: 'string',
      required: true
    },
    data: {
      type: 'string',
      required: true
    },
    params: {
      type: 'json',
      defaultsTo: {}
    }
  },

  exits: {
    success: {
      description: 'Setting data in key successful'
    }
  },

  fn: async function ({ key, data, params }) {
    let storageData = data;
    if (typeof data === 'object') {
      storageData = JSON.stringify(data);
    }
    return sails.config.redisClient.set(key, storageData, params);
  }
};
