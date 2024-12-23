FROM node:18

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

COPY .env .env

RUN pnpm build

EXPOSE 8080

CMD ["pnpm", "dev"]
