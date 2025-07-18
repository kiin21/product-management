FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Lệnh chạy ứng dụng
CMD [ "node", "index.js" ]