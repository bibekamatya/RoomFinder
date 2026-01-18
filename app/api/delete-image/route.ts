import { NextRequest, NextResponse } from 'next/server';
import { deleteImage } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    await deleteImage(url);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
