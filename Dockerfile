ARG NODE_VERSION=22.12.0
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
