FROM node:14.20.0

WORKDIR /app

# app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent

COPY . ./

RUN yarn build
