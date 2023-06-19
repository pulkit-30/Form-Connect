/**
 * redis hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */
const { createClient } = require("redis");

module.exports = function defineRedisHook(sails) {
  return {
    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function () {
      sails.log.info("Initializing custom hook (`redis`)");
      const client = createClient({
        url: sails.config.redisUrl,
      });
      client.on("error", async (err) => console.log(err));

      sails.config.redisClient = client;
      return client.connect();
    },
  };
};
