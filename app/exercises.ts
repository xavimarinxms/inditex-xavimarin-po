/**
 * Registro de ejercicios.
 *
 * Para añadir un ejercicio nuevo:
 *   1. Crea la carpeta `app/ejercicio-N/` con su `page.tsx`.
 *   2. Añade una entrada aquí con su `slug`, `title` y `summary`.
 * El listado de la página raíz "/" se genera a partir de este array.
 */
export type Exercise = {
  slug: string;
  title: string;
  summary: string;
};

export const exercises: Exercise[] = [
  {
    slug: "ejercicio-2",
    title: "Ejercicio 2 — Negociación de API",
    summary:
      "Un único endpoint /modify-delivery-date con contrato aditivo: franjas horarias flexibles para Zara y sparse fieldset para Bershka.",
  },
];
