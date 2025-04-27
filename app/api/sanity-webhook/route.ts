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
    const { _type, _id } = body;

    console.log(`Sanity webhook: Document type: ${_type}, ID: ${_id}`);

    // Ревалидируем соответствующие пути на основе типа документа
    switch (_type) {
      case 'product':
        // Для продуктов обновляем главную страницу, страницу категории и страницу продукта
        revalidatePath('/', 'layout');
        revalidatePath('/product/[slug]', 'layout');
        revalidatePath('/category/[slug]', 'layout');
        break;
      case 'category':
        // Для категорий обновляем главную страницу и страницу категории
        revalidatePath('/', 'layout');
        revalidatePath('/category/[slug]', 'layout');
        break;
      case 'about':
        // Обновляем страницу "О нас"
        revalidatePath('/about');
        break;
      case 'contacts':
        // Обновляем страницу контактов
        revalidatePath('/contacts');
        break;
      default:
        // Если тип документа неизвестен или это общие настройки - обновляем все страницы
        revalidatePath('/', 'layout');
        break;
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type,
      id: _id,
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: err },
      { status: 500 }
    );
  }
}
