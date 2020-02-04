FROM node:8.11

WORKDIR /app/frontend

COPY package.json yarn.lock /app/frontend
RUN npm install

COPY . /app/frontend

# replace this with your application's default port
EXPOSE 3000
CMD [ "npm", "start" ]