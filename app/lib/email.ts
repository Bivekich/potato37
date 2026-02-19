import nodemailer from "nodemailer";
import { Order, CartItem } from "../types";

const transporter = nodemailer.createTransport({
  host: "smtp.beget.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function formatCartItems(items: CartItem[]): string {
  return items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px;border:1px solid #ddd;">${item.product.name}</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.quantity} шт.</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:right;">${item.product.price} &#8381;</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:right;">${item.product.price * item.quantity} &#8381;</td>
        </tr>`,
    )
    .join("");
}

export async function sendOrderByEmail(order: Order): Promise<boolean> {
  try {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipientEmail = process.env.ORDER_EMAIL || smtpUser;

    if (!smtpUser || !smtpPass) {
      console.error("SMTP credentials not configured");
      return false;
    }

    const deliveryPrice =
      order.deliveryMethod === "delivery" && order.total < 2000 ? 250 : 0;
    const totalWithDelivery = order.total + deliveryPrice;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#e53e3e;">Новый заказ на сайте Картофель 37!</h2>

        <h3>Данные клиента:</h3>
        <p><strong>Имя:</strong> ${order.name}</p>
        <p><strong>Телефон:</strong> ${order.phone}</p>
        <p><strong>Город:</strong> ${order.city}</p>
        <p><strong>Способ получения:</strong> ${order.deliveryMethod === "delivery" ? "Доставка" : "Самовывоз"}</p>
        ${order.deliveryMethod === "delivery" ? `<p><strong>Адрес:</strong> ${order.address || "Не указан"}</p>` : ""}
        ${order.comment ? `<p><strong>Комментарий:</strong> ${order.comment}</p>` : ""}

        <h3>Состав заказа:</h3>
        <table style="border-collapse:collapse;width:100%;">
          <thead>
            <tr style="background:#f7f7f7;">
              <th style="padding:8px;border:1px solid #ddd;text-align:left;">Товар</th>
              <th style="padding:8px;border:1px solid #ddd;text-align:center;">Кол-во</th>
              <th style="padding:8px;border:1px solid #ddd;text-align:right;">Цена</th>
              <th style="padding:8px;border:1px solid #ddd;text-align:right;">Сумма</th>
            </tr>
          </thead>
          <tbody>
            ${formatCartItems(order.items)}
          </tbody>
        </table>

        <div style="margin-top:16px;padding:12px;background:#f7f7f7;border-radius:8px;">
          <p style="margin:4px 0;"><strong>Сумма товаров:</strong> ${order.total} &#8381;</p>
          <p style="margin:4px 0;"><strong>Доставка:</strong> ${deliveryPrice === 0 ? "Бесплатно" : `${deliveryPrice} &#8381;`}</p>
          <p style="margin:4px 0;font-size:18px;"><strong>Итого к оплате: ${totalWithDelivery} &#8381;</strong></p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Картофель 37" <${smtpUser}>`,
      to: recipientEmail,
      subject: `Новый заказ от ${order.name} - ${totalWithDelivery} ₽`,
      html,
    });

    return true;
  } catch (error) {
    console.error("Ошибка при отправке email:", error);
    return false;
  }
}
