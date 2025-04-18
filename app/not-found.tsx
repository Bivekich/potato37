import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-[70vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="text-9xl font-bold text-primary mb-4 relative">
            404
            <span className="absolute -top-6 -right-6 text-4xl transform rotate-12">
              Ой!
            </span>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-6xl">
              🥔
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4">
            Картошка потерялась!
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            Похоже, наша картошка укатилась куда-то не туда. Страница, которую
            вы ищете, не найдена или была переставлена в другое место.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">Вернуться на главную</Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/contacts">Связаться с нами</Link>
            </Button>
          </div>

          <p className="mt-8 text-muted-foreground italic">
            Может, картошка просто пошла на перекур? 🤔
          </p>
        </div>
      </div>
    </div>
  );
}
