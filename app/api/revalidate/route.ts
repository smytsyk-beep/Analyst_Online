// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

type SanityWebhookBody = {
  _type: string;
  slug?: { current: string };
};

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret');
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { body, isValidSignature } = await parseBody<SanityWebhookBody>(
      req,
      process.env.SANITY_WEBHOOK_SECRET,
    );

    if (process.env.SANITY_WEBHOOK_SECRET && !isValidSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    const type = body._type;
    revalidatePath('/', 'layout');

    console.log(`Revalidated for type: ${type}`);

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type,
    });
  } catch (err: unknown) {
    console.error('Revalidation error:', err);
    const message = err instanceof Error ? err.message : 'Unknown revalidation error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
