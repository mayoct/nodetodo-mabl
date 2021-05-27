FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ADD css/ /usr/src/app/css/
CMD [ "node", "app.js" ]
