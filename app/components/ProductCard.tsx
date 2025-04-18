'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Product } from '@/app/types';
import { useCart } from '@/app/hooks/use-cart';
import { ShoppingCart, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const cart = useCart();

  const handleAddToCart = () => {
    cart.addItem(product);
    toast.success(`${product.name} добавлен в корзину`);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group">
      <div className="relative aspect-square overflow-hidden bg-muted/40">
        {product.images &&
        product.images.length > 0 &&
        product.images[0].url ? (
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">Нет изображения</span>
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        <p className="font-bold text-lg text-primary">{product.price} ₽</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 gap-2">
        <Button variant="outline" size="sm" asChild className="flex-1">
          <Link href={`/product/${product.slug}`}>
            <Eye className="h-4 w-4 mr-1" /> Подробнее
          </Link>
        </Button>
        <Button onClick={handleAddToCart} size="sm" className="flex-1">
          <ShoppingCart className="h-4 w-4 mr-1" /> В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}
