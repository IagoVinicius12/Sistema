FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

RUN ls -la node_modules/.prisma/client || echo "PRISMA CLIENT NÃO ENCONTRADO"

CMD ["npm", "run", "start:prod"]
