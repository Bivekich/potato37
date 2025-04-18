import { NextResponse } from 'next/server';
import { client } from '@/app/sanity/client';

export async function GET() {
  try {
    const products = await client.fetch(`*[_type == "product"][0...1] {
      _id,
      name,
      "images": images[] {
        _key,
        asset->,
        "url": asset->url,
        "alt": alt
      }
    }`);

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
