FROM python:3.6

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        sqlite3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend

COPY requirements.txt /app/backend
RUN pip3 install -r requirements.txt

COPY . /app/backend

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]