FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p ./css && cp ./css/style.css ./css
CMD [ "node", "app.js" ]
