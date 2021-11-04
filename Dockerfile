FROM node:lts-alpine

WORKDIR /app
RUN set -ex && \
  adduser node root && \
  apk add --update --no-cache \
  curl

COPY . .

RUN npm install
# RUN npm run build

USER node
EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["run", "server"]
