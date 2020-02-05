FROM node:8.11

WORKDIR /app

COPY package.json yarn.lock /app/
RUN npm install

COPY . /app

# replace this with your application's default port
EXPOSE 3000
CMD [ "npm", "start" ]