FROM node:17-alpine
WORKDIR /app/
COPY package.json yarn.lock ./
RUN yarn
RUN yarn add global nodemon
COPY . .
EXPOSE 1337
CMD ["node", "app.js"]
