// app/studio/[[...tool]]/page.tsx
'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';
import { isSanityConfigured } from '@/sanity/config';

export default function StudioPage() {
  if (!isSanityConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-6">
        <div className="max-w-2xl space-y-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
            <span className="text-4xl">⚙️</span>
          </div>
          <h1 className="text-3xl font-semibold text-white">Sanity Studio Not Configured</h1>
          <div className="space-y-4 text-left text-neutral-300">
            <p>Sanity CMS is not configured yet. To enable Studio, follow these steps:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Create a Sanity project at{' '}
                <a
                  href="https://sanity.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  sanity.io
                </a>
              </li>
              <li>Get your Project ID and API Token</li>
              <li>
                Add environment variables in Vercel:
                <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
                  <li>
                    <code className="rounded bg-white/10 px-2 py-1">
                      NEXT_PUBLIC_SANITY_PROJECT_ID
                    </code>
                  </li>
                  <li>
                    <code className="rounded bg-white/10 px-2 py-1">
                      NEXT_PUBLIC_SANITY_DATASET
                    </code>
                  </li>
                  <li>
                    <code className="rounded bg-white/10 px-2 py-1">SANITY_API_TOKEN</code>
                  </li>
                </ul>
              </li>
              <li>Redeploy the application</li>
            </ol>
            <p className="pt-4">
              For detailed instructions, see{' '}
              <code className="rounded bg-white/10 px-2 py-1">docs/DEPLOY_SPRINT6.md</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
