FROM python:3.10-slim

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y netcat-traditional

RUN chmod +x wait-for-it.sh

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["./wait-for-it.sh", "db", "5432", "--", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
