import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '59wlmucu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-12-01',
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);

interface ImageSource {
  url?: string;
  _type?: string;
  asset?: {
    _ref: string;
    _type: string;
  };
}

export function urlFor(source: ImageSource | string) {
  // Если у нас есть URL напрямую, просто возвращаем его
  if (source && typeof source === 'object' && 'url' in source) {
    return {
      url: () => source.url,
    };
  }

  // Иначе используем imageUrlBuilder
  return builder.image(source);
}
