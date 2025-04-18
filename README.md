# Картофель 37

## Инструкция по деплою

### Требования

- Node.js 19+
- npm или yarn
- PM2 (установите глобально: `npm install -g pm2`)

### 1. Клонирование репозитория

```bash
git clone https://github.com/your-username/potato37.git
cd potato37
```

### 2. Установка зависимостей

```bash
npm install
# или
yarn install
```

### 3. Настройка переменных окружения

Скопируйте файл `.env.production` и заполните его своими значениями:

```bash
cp .env.production.example .env.production
# Отредактируйте .env.production своими данными
```

Убедитесь, что вы заполнили следующие переменные окружения:

- `NEXT_PUBLIC_BASE_URL` - URL вашего сайта
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - ID проекта Sanity
- `NEXT_PUBLIC_SANITY_DATASET` - название датасета Sanity (обычно "production")
- `TELEGRAM_BOT_TOKEN` - токен вашего Telegram бота
- `TELEGRAM_CHAT_ID` - ID чата для отправки уведомлений

### 4. Сборка приложения

```bash
npm run build
# или
yarn build
```

### 5. Запуск через PM2

```bash
npm run deploy
# или
yarn deploy
```

Это запустит приложение через PM2 с настройками из файла ecosystem.config.js.

### Управление приложением

- Запуск: `npm run pm2:start`
- Остановка: `npm run pm2:stop`
- Перезапуск: `npm run pm2:restart`
- Удаление из PM2: `npm run pm2:delete`
- Просмотр логов: `pm2 logs potato37`
- Просмотр статуса: `pm2 status`

### Автоматический запуск при перезагрузке сервера

```bash
pm2 startup
# Выполните команду, которую предложит PM2
pm2 save
```

### Настройка NGINX (опционально)

Пример конфигурации NGINX для проксирования запросов к Next.js:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
# potato37
