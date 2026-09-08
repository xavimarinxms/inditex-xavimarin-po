# Casos prácticos — Product Owner

Next.js (App Router · TypeScript · Tailwind CSS). Aloja varios prototipos de un
caso práctico de entrevista de Product Owner, cada uno bajo su propia ruta, en un
único proyecto de Vercel.

## Desarrollo

```bash
npm install
npm run dev
```

## Build / producción (Vercel usa esto por defecto)

```bash
npm run build
npm run start
```

## Estructura

```
app/
  page.tsx            → listado raíz "/" (se genera desde app/exercises.ts)
  exercises.ts        → registro de ejercicios
  ejercicio-2/
    page.tsx          → server component + metadata
    ApiConsole.tsx    → prototipo interactivo (client-side)
components/
  ExerciseShell.tsx   → cabecera + enlace de vuelta, común a los ejercicios
```

## Añadir un ejercicio nuevo

1. Crea `app/ejercicio-3/page.tsx` (envuélvelo en `<ExerciseShell>`).
2. Añade una entrada en `app/exercises.ts`.

No hace falta tocar nada más: el listado raíz se actualiza solo.
