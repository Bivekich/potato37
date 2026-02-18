"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/hooks/use-cart";
import { Button } from "@/app/components/ui/button";
import { DeliveryMethod, Order } from "@/app/types";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryMethod: "delivery" as DeliveryMethod,
    comment: "",
  });

  useEffect(() => {
    if (cart.items.length === 0) {
      router.push("/cart");
    } else {
      setIsLoading(false);
    }
  }, [cart.items.length, router]);

  const subtotal = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const deliveryPrice =
    formData.deliveryMethod === "delivery" && subtotal < 2000 ? 250 : 0;
  const total = subtotal + deliveryPrice;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.items.length === 0) {
      alert("Ваша корзина пуста");
      return;
    }

    if (!formData.name.trim()) {
      alert("Пожалуйста, введите ваше имя");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Пожалуйста, введите ваш телефон");
      return;
    }

    if (formData.deliveryMethod === "delivery" && !formData.address.trim()) {
      alert("Пожалуйста, введите адрес доставки");
      return;
    }

    setIsSubmitting(true);

    try {
      const order: Order = {
        items: cart.items,
        total,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        deliveryMethod: formData.deliveryMethod,
        comment: formData.comment,
      };

      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const result = await response.json();

      if (result.success) {
        cart.clearCart();
        alert("Ваш заказ успешно отправлен!");
        router.push("/");
      } else {
        alert(
          "Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.",
        );
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert(
        "Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg border p-6"
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Контактная информация
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Способ получения</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="delivery"
                      name="deliveryMethod"
                      value="delivery"
                      checked={formData.deliveryMethod === "delivery"}
                      onChange={handleChange}
                      className="h-4 w-4 text-orange-600"
                    />
                    <label htmlFor="delivery">
                      Доставка
                      {subtotal < 2000 && (
                        <span className="text-sm text-gray-500 ml-2">
                          (+250 ₽, бесплатно от 2000 ₽)
                        </span>
                      )}
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="pickup"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === "pickup"}
                      onChange={handleChange}
                      className="h-4 w-4 text-orange-600"
                    />
                    <label htmlFor="pickup">
                      Самовывоз
                      <span className="text-sm text-gray-500 ml-2">
                        (г. Иваново, ул. Примерная, д. 123)
                      </span>
                    </label>
                  </div>

                  {formData.deliveryMethod === "delivery" && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-1">
                        Адрес доставки *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required={formData.deliveryMethod === "delivery"}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Улица, дом, квартира, подъезд, этаж"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Комментарий к заказу
                </h2>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Комментарий к заказу (необязательно)"
                />
              </div>
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Оформление..." : "Оформить заказ"}
              </Button>
            </div>
          </form>
        </div>

        <div>
          <div className="bg-white rounded-lg border p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Ваш заказ</h2>

            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between text-sm py-2 border-b last:border-0"
                >
                  <div>
                    <span className="font-medium">{item.product.name}</span>
                    <span className="text-gray-500 ml-2">
                      × {item.quantity}
                    </span>
                  </div>
                  <span>{item.product.price * item.quantity} ₽</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Товары</span>
                <span>{subtotal} ₽</span>
              </div>

              <div className="flex justify-between">
                <span>Доставка</span>
                <span>
                  {formData.deliveryMethod === "delivery" && subtotal < 2000
                    ? `${deliveryPrice} ₽`
                    : "Бесплатно"}
                </span>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Итого</span>
                <span>{total} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
