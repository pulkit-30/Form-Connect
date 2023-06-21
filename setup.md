### Setup FormClient Server

##### Pre-Requistic

1. install node:16.14.0 locally.
2. have mongodb dameon up and running at port 27017.
3. have redis running at port 6379.

```
Follow these steps to run mongodb and redis using docker

Open Terminal and run following commands

1. For MongoDB
 >  $ docker run -d --rm -p 27017:27017 -v mongoData:/data/db --name mongo mongo

2. For Redis,
 >  $ docker run --rm -d -p 6379:6379 --name redis redis

(Make Sure docker daemon up and running)

```

##### To setup Server locally, run following commands in Form-Connect/ directory,

1. ```
   yarn
   ```

2. ```
   nodemon app.js
   ```

##### To Add Google Sheet Plugin Run following command

```
  npx sails run ex
```

#### ENV file

Add `local.js` inside config folder with this content

> add value of authJwtSecret\*

```
/**
 * Local environment settings
 *
 * Use this file to specify configuration settings for use while developing
 * the app on your personal system.
 *
 * For more information, check out:
 * https://sailsjs.com/docs/concepts/configuration/the-local-js-file
 */

module.exports = {
  // Any configuration settings may be overridden below, whether it's built-in Sails
  // options or custom configuration specifically for your app (e.g. Stripe, Sendgrid, etc.)
  datastores: {
    default: {
      adapter: "sails-mongo",
      url: "mongodb://localhost:27017/atlan-local-main",
    },
    test: {
      adapter: "sails-mongo",
      url: "mongodb://localhost:27017/atlan-local-test",
    },
    redis: {
      adapter: "sails-redis",
      url: "redis://localhost:6379",
    },
  },
  authJwtSecret: ,
  redisUrl: "redis://localhost:6379",
  security: {
    cors: {
      allRoutes: true,
      allowOrigins: ["http://localhost:3000"],
      allowCredentials: false,
      allowRequestHeaders: "content-type,authorization",
    },
  },
  userSessionInvalidateLimitSeconds: 1800,
};
```
