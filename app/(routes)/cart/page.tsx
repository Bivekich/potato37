'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useCart } from '@/app/hooks/use-cart';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const cart = useCart();

  const totalItems = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const subtotal = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const incrementQuantity = (productId: string) => {
    const item = cart.items.find((item) => item.product._id === productId);
    if (item) {
      cart.updateQuantity(productId, item.quantity + 1);
    }
  };

  const decrementQuantity = (productId: string) => {
    const item = cart.items.find((item) => item.product._id === productId);
    if (item && item.quantity > 1) {
      cart.updateQuantity(productId, item.quantity - 1);
    } else {
      cart.removeItem(productId);
    }
  };

  const removeItem = (productId: string) => {
    cart.removeItem(productId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-6">Ваша корзина пуста</p>
          <Button asChild>
            <Link href="/">Перейти к покупкам</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg border p-6">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex items-center gap-4 py-4 border-b last:border-0"
                  >
                    <div className="relative w-20 h-20 overflow-hidden rounded-md">
                      {item.product.images &&
                        item.product.images.length > 0 && (
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                    </div>

                    <div className="flex-1">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-medium hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {item.product.price} ₽
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decrementQuantity(item.product._id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <MinusCircle size={20} />
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item.product._id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <PlusCircle size={20} />
                      </button>
                    </div>

                    <div className="text-right font-medium">
                      {item.product.price * item.quantity} ₽
                    </div>

                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg border p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Итого</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Товары ({totalItems})</span>
                  <span>{subtotal} ₽</span>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Итого</span>
                  <span>{subtotal} ₽</span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => router.push('/checkout')}
                >
                  Оформить заказ
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
