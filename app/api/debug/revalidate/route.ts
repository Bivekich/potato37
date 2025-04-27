import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { path = '/', secret } = body;

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidatePath(path);

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    path,
  });
}
