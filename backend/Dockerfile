FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copie apenas o schema e migrations primeiro
COPY prisma ./prisma
RUN cat prisma/schema.prisma
# Gere o Prisma Client com base no schema correto
RUN npx prisma generate

# Copie o restante do projeto
COPY . .

# Compile o projeto
RUN npm run build

CMD ["npm", "run", "start:prod"]
