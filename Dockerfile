# этап сборки (build stage)
#FROM node:lts-alpine as build-stage
#WORKDIR /app
#COPY package.json ./
#RUN yarn
#COPY . ./
#RUN yarn build
#
## этап production (production-stage)
#FROM nginx:stable-alpine as production-stage
#COPY --from=build-stage /app/dist /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

FROM node:lts-alpine as build-stage
WORKDIR /app
#COPY package.json ./
#RUN yarn
#COPY . ./
EXPOSE 8080
CMD ["yarn"]
#CMD ["yarn", "serve"]