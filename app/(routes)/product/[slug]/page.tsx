import Image from 'next/image';
import { client } from '@/app/sanity/client';
import { Product } from '@/app/types';
import { notFound } from 'next/navigation';
import AddToCartButton from '../../../components/AddToCartButton';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Product | null> {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
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
    }`,
    { slug }
  );
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Товар не найден | Картофель 37',
    };
  }

  return {
    title: `${product.name} | Картофель 37`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          {product.images &&
            product.images.length > 0 &&
            product.images[0].url && (
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-orange-600 mb-4">
            {product.price} ₽
          </p>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Описание</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="flex gap-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {product.images && product.images.length > 1 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Галерея</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {product.images.slice(1).map(
              (image) =>
                image.url && (
                  <div
                    key={image._key}
                    className="relative aspect-square overflow-hidden rounded-lg"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
