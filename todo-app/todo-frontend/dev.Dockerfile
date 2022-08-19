FROM node:16 as base

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json

FROM base as test
RUN npm ci
COPY --chown=node . .
USER node
CMD [ "npm", "run", "test" ]

FROM base as prod
RUN npm ci --production
RUN npm run build
COPY --chown=node . .
USER node
CMD [ "serve", "-S", "build" ]
EXPOSE 3001