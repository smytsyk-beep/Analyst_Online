// components/site/footer.tsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="page flex h-16 items-center justify-between text-xs text-white/60">
        <span>© {year} Analyst Online</span>
        <span className="hidden sm:inline">Analytics, dashboards &amp; AI bots.</span>
      </div>
    </footer>
  );
}
