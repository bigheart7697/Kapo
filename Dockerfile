FROM python:3.7-alpine AS build-python
COPY ./Kapo_Back/requirements.txt /
RUN apk add --no-cache jpeg-dev zlib-dev
RUN apk add --no-cache --virtual .build-deps build-base linux-headers
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /wheels -r requirements.txt

FROM python:3.7-alpine
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DEBUG 0
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql-dev \
    && pip install psycopg2 \
    && apk del build-deps
COPY --from=build-python /wheels /wheels
COPY --from=build-python requirements.txt .
RUN pip install --no-cache /wheels/*
WORKDIR /app
COPY . .
RUN adduser -D myuser
USER myuser
CMD gunicorn Kapo_Back.wsgi.application --bind 0.0.0.0:$PORT