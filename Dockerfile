FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY css ./
CMD [ "node", "app.js" ]
