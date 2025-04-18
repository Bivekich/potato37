import { NextRequest, NextResponse } from 'next/server';
import { sendOrderToTelegram } from '@/app/lib/telegram';
import { Order } from '@/app/types';

export async function POST(req: NextRequest) {
  try {
    const order: Order = await req.json();

    if (!order || !order.items || order.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Корзина пуста' },
        { status: 400 }
      );
    }

    if (!order.name || !order.phone) {
      return NextResponse.json(
        { success: false, error: 'Не указаны контактные данные' },
        { status: 400 }
      );
    }

    if (order.deliveryMethod === 'delivery' && !order.address) {
      return NextResponse.json(
        { success: false, error: 'Не указан адрес доставки' },
        { status: 400 }
      );
    }

    const success = await sendOrderToTelegram(order);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Ошибка при отправке заказа в Telegram' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { success: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
