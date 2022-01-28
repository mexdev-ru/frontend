# этап сборки (build stage)
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY ./src ./src
COPY babel.config.js vue.config.js .env ./
#RUN ls -lah && sleep 30000
RUN yarn build

## этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]