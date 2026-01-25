// app/[lang]/[...slug]/page.tsx
import { notFound } from 'next/navigation';

export default function LangCatchAllPage() {
  // Любой неизвестный путь внутри /ua /ru /ro -> локализованная 404
  notFound();
}
