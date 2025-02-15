FROM node:20-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install --only=production

COPY dist /app/dist
COPY frontend-dist /app/frontend-dist

COPY .env /app/.env

EXPOSE 8080

CMD ["node", "dist/main.js"]
