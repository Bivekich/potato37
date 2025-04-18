import { Order, CartItem } from '../types';

export async function sendOrderToTelegram(order: Order): Promise<boolean> {
  try {
    // Проверяем доступны ли окружения на стороне клиента
    let botToken: string | undefined;
    let chatId: string | undefined;

    if (typeof window !== 'undefined') {
      // Клиентская сторона - получаем NEXT_PUBLIC_ переменные
      // Используем переменные окружения с префиксом NEXT_PUBLIC_
      botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    } else {
      // Серверная сторона - используем обычные переменные окружения
      botToken = process.env.TELEGRAM_BOT_TOKEN;
      chatId = process.env.TELEGRAM_CHAT_ID;
    }

    if (!botToken || !chatId) {
      console.error('Отсутствуют токены для Telegram бота');
      return false;
    }

    const formatCartItems = (items: CartItem[]): string => {
      return items
        .map(
          (item) =>
            `${item.product.name} - ${item.quantity} шт. - ${item.product.price} ₽`
        )
        .join('\n');
    };

    const deliveryPrice =
      order.deliveryMethod === 'delivery' && order.total < 2000 ? 250 : 0;
    const totalWithDelivery = order.total + deliveryPrice;

    const message = `
🔥 Новый заказ!

👤 Имя: ${order.name}
📱 Телефон: ${order.phone}
${order.deliveryMethod === 'delivery' ? `🏠 Адрес: ${order.address || 'Не указан'}` : '🏪 Самовывоз'}
${order.comment ? `💬 Комментарий: ${order.comment}` : ''}

📋 Заказ:
${formatCartItems(order.items)}

💰 Сумма: ${order.total} ₽
🚚 Доставка: ${deliveryPrice} ₽
💰 Итого к оплате: ${totalWithDelivery} ₽
`;

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.error('Ошибка при отправке заказа в Telegram:', error);
    return false;
  }
}
