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

## Настройка Sanity для синхронизации данных с сайтом

### Настройка ISR и автоматической ревалидации

В проекте настроена технология Incremental Static Regeneration (ISR), которая позволяет автоматически обновлять страницы сайта при изменении данных в Sanity CMS. Для правильной работы необходимо:

1. Убедиться, что в `.env.local` или `.env.production` заданы следующие переменные окружения:

```
# Секреты для API ревалидации и вебхуков
REVALIDATE_SECRET=ваш_секретный_ключ_для_ручного_обновления
SANITY_WEBHOOK_SECRET=ваш_секретный_ключ_для_вебхуков

# Конфигурация времени ревалидации (в секундах)
NEXT_PUBLIC_REVALIDATE_TIME=3600
```

2. В коде приложения для всех страниц добавлен параметр `revalidate`, который определяет время (в секундах) между автоматическими обновлениями страниц.

3. Настроен специальный API-роут `/api/sanity-webhook`, который вызывается автоматически при изменениях в Sanity CMS и мгновенно обновляет соответствующие страницы сайта.

### Настройка вебхуков

Для автоматической синхронизации данных с сайтом, нужно настроить вебхуки в Sanity:

1. Открыть проект Sanity в админке [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Перейти в раздел API -> Webhooks
3. Нажать "Create webhook"
4. Заполнить форму:

   - Name: Revalidate Next.js Cache
   - URL: https://YOUR_SITE_URL/api/sanity-webhook
   - Dataset: production
   - Trigger on: Create, Update, Delete
   - Filter: Можно оставить пустым или указать конкретные типы документов, например: `_type in ["product", "category", "about", "contacts"]`
   - Secret: Создать секретный ключ и сохранить его
   - HTTP method: POST
   - API version: v2021-03-25
   - Include document: Включить

5. Добавить секретный ключ в .env файл:

```
SANITY_WEBHOOK_SECRET=ваш_секретный_ключ
```

### Ручная инвалидация кэша

Если нужно вручную обновить кэш сайта, можно использовать API:

```bash
curl -X POST https://YOUR_SITE_URL/api/debug/revalidate \
  -H "Content-Type: application/json" \
  -d '{"path":"/", "secret":"REVALIDATE_SECRET"}'
```

Добавьте в .env файл:

```
REVALIDATE_SECRET=ваш_секретный_ключ_для_ручного_обновления
```

# potato37
