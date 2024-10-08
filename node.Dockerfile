FROM node:18

WORKDIR /app

# Copie o package.json e o package-lock.json (ou yarn.lock) primeiro para instalar dependências
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copie todo o resto dos arquivos do diretório de trabalho
COPY . .

CMD ["node", "server.js"]
