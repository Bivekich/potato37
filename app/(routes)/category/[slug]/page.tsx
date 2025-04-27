import { Suspense } from 'react';
import { client } from '@/app/sanity/client';
import { Product, Category } from '@/app/types';
import { ProductCard } from '@/app/components/ProductCard';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

async function getCategory(slug: string): Promise<Category | null> {
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current
    }`,
    { slug }
  );
}

async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return client.fetch(
    `*[_type == "product" && category._ref == $categoryId] {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      price,
      description,
      "category": category->{
        _id,
        name,
        "slug": slug.current
      },
      "images": images[] {
        _key,
        "url": asset->url,
        "alt": alt
      }
    }`,
    { categoryId }
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'Категория не найдена | Картофель 37',
    };
  }

  return {
    title: `${category.name} | Картофель 37`,
    description: `Товары из категории ${category.name}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category._id);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h1>
        <div className="flex gap-4 mb-8">
          <a href="/" className="text-primary hover:underline">
            Вернуться на главную
          </a>
        </div>
      </section>

      <section>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Suspense fallback={<ProductsLoadingSkeleton />}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </Suspense>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">
              В этой категории пока нет товаров
            </p>
          </div>
        )}
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
