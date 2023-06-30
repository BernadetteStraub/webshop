FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install
COPY . .
ENV DATABASE_URL="postgresql://root:root_password@db:5432/webshop"
ENV JWT_SECRET=my_jwt_secret
COPY . /usr/src/app
EXPOSE 3000

CMD [ "node", "app.js" ]