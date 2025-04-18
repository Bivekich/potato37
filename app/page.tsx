import { Suspense } from 'react';
import { client } from './sanity/client';
import { Product } from './types';
import { ProductCard } from './components/ProductCard';

async function getProducts(): Promise<Product[]> {
  return client.fetch(`*[_type == "product"] {
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    price,
    description,
    "images": images[] {
      _key,
      "url": asset->url,
      "alt": alt
    }
  }`);
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Картофель 37
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              Вкусная еда с доставкой по Иваново
            </p>
            <p className="text-lg md:text-xl font-medium inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              Доставка от 2000₽ бесплатно!
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Наши блюда</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Suspense fallback={<ProductsLoadingSkeleton />}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Suspense>
        </div>
      </section>
    </div>
  );
}

function ProductsLoadingSkeleton() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden border bg-card animate-pulse"
        >
          <div className="aspect-square bg-muted"></div>
          <div className="p-4">
            <div className="h-6 bg-muted rounded mb-2 w-2/3"></div>
            <div className="h-5 bg-muted rounded mb-4 w-1/4"></div>
            <div className="h-4 bg-muted rounded mb-4 w-full"></div>
            <div className="flex justify-between">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-8 bg-muted rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
