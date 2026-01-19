export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm opacity-70">
        © {new Date().getFullYear()} Analyst Online
      </div>
    </footer>
  );
}
