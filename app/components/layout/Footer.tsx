'use client';

import Link from 'next/link';
import {
  PhoneCall,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Картофель 37
            </h3>
            <p className="text-muted-foreground mb-4">
              Вкусная и качественная еда с доставкой по Иваново. Мы готовим с
              любовью и заботой о каждом клиенте.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Меню</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-muted-foreground">
                <PhoneCall size={16} />
                <a
                  href="tel:+78005553535"
                  className="hover:text-primary transition-colors"
                >
                  +7 (800) 555-35-35
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} />
                <a
                  href="mailto:info@potato37.ru"
                  className="hover:text-primary transition-colors"
                >
                  info@potato37.ru
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>г. Иваново, ул. Примерная, д. 37</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Картофель 37. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
