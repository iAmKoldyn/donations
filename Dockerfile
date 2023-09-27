FROM node:18

WORKDIR /usr/src/app

<<<<<<< HEAD
COPY package*.json ./
=======
COPY package.json .
>>>>>>> feature-models

RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "dev" ]
