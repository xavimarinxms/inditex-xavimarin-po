import Link from "next/link";
import { exercises } from "./exercises";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <h1 className="text-2xl font-semibold tracking-tight">
        Casos prácticos — Product Owner
      </h1>
      <p className="mt-3 text-sm text-neutral-600">
        Prototipos para un caso práctico de entrevista. Cada ejercicio vive en su
        propia ruta.
      </p>

      <ul className="mt-10 divide-y divide-neutral-200 border-t border-b border-neutral-200">
        {exercises.map((ex) => (
          <li key={ex.slug}>
            <Link
              href={`/${ex.slug}`}
              className="block py-5 group focus:outline-none focus-visible:bg-neutral-50"
            >
              <span className="text-base font-medium group-hover:underline underline-offset-4">
                {ex.title}
              </span>
              <span className="mt-1 block text-sm text-neutral-600">
                {ex.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
