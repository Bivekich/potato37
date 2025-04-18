'use client';

import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '@/app/hooks/use-cart';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';

export function Header() {
  const cart = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const cartItemsCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const closeSheet = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Картофель 37</span>
        </Link>

        {/* Десктопное меню */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Главная
          </Link>
          <Link
            href="/about"
            className="text-foreground hover:text-primary transition-colors"
          >
            О нас
          </Link>
          <Link
            href="/contacts"
            className="text-foreground hover:text-primary transition-colors"
          >
            Контакты
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </Button>

          {/* Мобильное меню */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-primary">Меню</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <Link
                  href="/"
                  onClick={closeSheet}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Главная
                </Link>
                <Link
                  href="/about"
                  onClick={closeSheet}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  О нас
                </Link>
                <Link
                  href="/contacts"
                  onClick={closeSheet}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Контакты
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
