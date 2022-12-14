FROM python:3.6

# Install curl, node, & yarn
RUN apt-get -y install curl \
  && curl -sL https://deb.nodesource.com/setup_8.x | bash \
  && apt-get -y install nodejs \
  && curl -o- -L https://yarnpkg.com/install.sh | bash

WORKDIR /app/backend

# Install Python dependencies
COPY ./Kapo_Back/requirements.txt /app/backend/
RUN pip3 install -r requirements.txt

# Install JS dependencies
WORKDIR /app/frontend

COPY ./Kapo_Front/kapo/package.json ./Kapo_Front/kapo/yarn.lock /app/frontend/
RUN $HOME/.yarn/bin/yarn install

# Add the rest of the code
COPY ./Kapo_Back /app/backend
COPY ./Kapo_Front/kapo /app/frontend

# Build static files
RUN $HOME/.yarn/bin/yarn build

# Have to move all static files other than index.html to root/
# for whitenoise middleware
WORKDIR /app/frontend/build

RUN mkdir root && mv *.ico *.js *.json root

# Collect static files
RUN mkdir /app/backend/staticfiles
RUN mkdir /app/backend/static
RUN mkdir /app/backend/media
RUN mkdir /app/backend/media/products
RUN mkdir /app/backend/media/users

WORKDIR /app

# SECRET_KEY is only included here to avoid raising an error when generating static files.
# Be sure to add a real SECRET_KEY config variable in Heroku.
RUN PRODUCTION=1\
  SECRET_KEY=somethingsupersecret \
  python3 backend/manage.py collectstatic --noinput

EXPOSE $PORT

CMD python3 backend/manage.py makemigrations
CMD python3 backend/manage.py migrate
CMD python3 backend/manage.py runserver 0.0.0.0:$PORT
