import type { Metadata } from "next";
import ExerciseShell from "@/components/ExerciseShell";
import ApiConsole from "./ApiConsole";

export const metadata: Metadata = {
  title: "Ejercicio 2 — Negociación de API",
};

export default function Ejercicio2Page() {
  return (
    <ExerciseShell
      title="Ejercicio 2 — Negociación de API"
      intro={
        <>
          <p>
            <strong>Delivery Plan</strong> es la API de planificación de entregas
            de Inditex. Dos equipos consumidores piden cambios distintos sobre el
            mismo endpoint <code className="font-mono">/modify-delivery-date</code>
            : Zara necesita más flexibilidad de franjas horarias y Bershka
            respuestas más ligeras.
          </p>
          <p>
            La solución es un <strong>único endpoint con contrato aditivo</strong>{" "}
            (retrocompatible): un array <code className="font-mono">time_slots</code>{" "}
            flexible y un parámetro <code className="font-mono">?fields=</code> para
            sparse fieldset. Esta consola muestra cómo se comporta.
          </p>
        </>
      }
    >
      <ApiConsole />
    </ExerciseShell>
  );
}
