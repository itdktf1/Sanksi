FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .
COPY index.html .
COPY script.js .
COPY style.css .
COPY logo_ojk.png .
COPY *.json ./
COPY *.docx ./

EXPOSE 8080

ENV FLASK_APP=app.py

# riwayat.json is written at runtime — mount it as a volume for data persistence:
#   docker run -p 8080:8080 -v $(pwd)/riwayat.json:/app/riwayat.json sanksi
CMD ["flask", "run", "--host=0.0.0.0", "--port=8080"]
