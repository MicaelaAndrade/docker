FROM node:14

# Instalando o Dockerize
RUN apt-get update && apt-get install -y wget \
    && wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-linux-amd64-v0.6.1.tar.gz

WORKDIR /usr/src/app

COPY package*.json ./

# Instalando as dependências, incluindo o módulo mysql
RUN npm install
RUN npm install mysql

COPY . .

CMD ["dockerize", "-wait", "tcp://mysql:3306", "-timeout", "60s", "npm", "start"]
