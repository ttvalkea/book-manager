FROM node:20-alpine3.16

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

RUN npx tsc

CMD [ "node", "dist/app.js" ]
