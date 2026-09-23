import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="mx-auto flex min-h-dvh max-w-2xl flex-col items-start justify-center px-6 py-20">
      <p className="text-sm font-semibold tracking-widest text-accent">AXT CASINO / 404</p>
      <h1 className="mt-6 text-5xl font-semibold tracking-tight">Seite nicht gefunden.</h1>
      <p className="mt-5 text-white/60">Die gesuchte Seite existiert nicht.</p>
      <Link href="/de" className="mt-8 rounded-full bg-accent px-6 py-3 font-semibold text-background hover:bg-white">Zurück zur Startseite</Link>
    </main>
  );
}
