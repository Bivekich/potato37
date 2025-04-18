'use client';

import { Button } from './ui/button';
import { useCart } from '@/app/hooks/use-cart';
import { Product } from '@/app/types';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const cart = useCart();

  const handleAddToCart = () => {
    cart.addItem(product);
  };

  return (
    <Button onClick={handleAddToCart} size="lg" className="w-full md:w-auto">
      Добавить в корзину
    </Button>
  );
}
