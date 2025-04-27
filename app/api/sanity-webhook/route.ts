import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Проверяем секрет вебхука
  const secret = request.headers.get('x-sanity-webhook-secret');
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: 'Invalid webhook secret' },
      { status: 401 }
    );
  }

  try {
    // Получаем информацию о том, какой тип документа был изменен
    const { _type } = body;

    if (_type === 'product') {
      // Для продуктов обновляем главную страницу и страницу продукта
      revalidatePath('/');
      revalidatePath('/product/[slug]', 'layout');
      revalidatePath('/category/[slug]', 'layout');
    } else if (_type === 'category') {
      // Для категорий обновляем главную страницу и страницу категории
      revalidatePath('/');
      revalidatePath('/category/[slug]', 'layout');
    } else {
      // Для других типов документов обновляем только конкретные страницы
      if (_type === 'about') {
        revalidatePath('/about');
      } else if (_type === 'contacts') {
        revalidatePath('/contacts');
      } else {
        // Если тип документа неизвестен, обновляем все страницы
        revalidatePath('/', 'layout');
      }
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type,
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: err },
      { status: 500 }
    );
  }
}
