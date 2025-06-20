FROM node:18-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование package.json
COPY package.json ./

# Установка зависимостей
RUN npm install --only=production

# Копирование исходного кода
COPY . .

# Открытие порта
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]