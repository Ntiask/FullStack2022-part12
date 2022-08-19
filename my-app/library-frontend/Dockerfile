FROM node:16 as base

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json

FROM base as prod
COPY --chown=node . .
RUN npm ci --production
USER node
CMD [ "npm", "start"]
EXPOSE 3001