// app/api/draft/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Parse query string parameters
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  // Check the secret and next parameters
  // This secret should only be known to this route handler and Sanity Studio
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode();
  draft.enable();

  // Validate slug to prevent open redirect vulnerabilities
  // Only allow internal paths starting with /
  const safePath = slug && slug.startsWith('/') ? slug : '/';
  redirect(safePath);
}
