FROM node:16-alpine

WORKDIR /var/www/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run test
RUN npm run lint
RUN npm run build

CMD ["node", "./server.js"]
