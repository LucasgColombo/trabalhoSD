FROM python:3.11

WORKDIR /app

# Copie o requirements.txt e instale as dependências
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copie os scripts Python
COPY . .

CMD ["python", "data_cleaning.py"]
