FROM node:14

# Instalando o Dockerize
RUN apt-get update && apt-get install -y dockerize

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["dockerize", "-wait", "tcp://mysql:3306", "-timeout", "20s", "npm", "start"]
