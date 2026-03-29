// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    // Verify secret
    const secret = req.nextUrl.searchParams.get('secret');
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse webhook body
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current: string };
    }>(req, process.env.SANITY_WEBHOOK_SECRET);

    // Validate signature if webhook secret is configured
    if (process.env.SANITY_WEBHOOK_SECRET && !isValidSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    // Revalidate based on document type
    const type = body._type;
    
    // Revalidate all pages (Next.js 16 approach)
    // This will revalidate all pages that use this data
    revalidatePath('/', 'layout');

    console.log(`✅ Revalidated for type: ${type}`);

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type,
    });
  } catch (err: any) {
    console.error('❌ Revalidation error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
