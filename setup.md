### Setup FormClient Server

Pre-Requistic

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

To setup Server locally, run following commands in Form-Connect/ directory,

1. ```
   yarn
   ```

2. ```
   nodemon app.js
   ```

To Add Google Sheet Plugin Run following command

```
  npx sails run ex
```
