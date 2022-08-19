FROM node:16

WORKDIR /usr/src/app

COPY --chown=node . .

RUN npm ci --only=production

ENV DEBUG=dockerfileexercise:*

USER node

CMD npm start