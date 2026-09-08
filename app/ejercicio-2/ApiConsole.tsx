"use client";

import { useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Datos de referencia (todo client-side, sin backend)                        */
/* -------------------------------------------------------------------------- */

type TimeSlot = { id: string; start: string; end: string };

const ZARA_SLOTS: TimeSlot[] = [
  { id: "s1", start: "09:00", end: "10:30" },
  { id: "s2", start: "10:00", end: "12:30" },
  { id: "s3", start: "17:00", end: "18:00" },
];

const BERSHKA_FIELDS = [
  "slots",
  "eta",
  "carrier",
  "warehouse",
  "history",
] as const;
type BershkaField = (typeof BERSHKA_FIELDS)[number];

const FULL_RESPONSE: Record<BershkaField | "order_id", unknown> = {
  order_id: "ES-2026-77410",
  slots: [{ start: "10:00", end: "12:30" }],
  eta: "2026-09-10T14:00:00Z",
  carrier: { name: "SEUR", tracking: "9871234" },
  warehouse: { id: "WH-04", city: "Zaragoza" },
  history: [{ status: "created", at: "2026-09-05" }],
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function byteLength(value: unknown): number {
  return new TextEncoder().encode(JSON.stringify(value)).length;
}

/* -------------------------------------------------------------------------- */
/*  Bloque de código reutilizable                                              */
/* -------------------------------------------------------------------------- */

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-md bg-neutral-50 p-4 font-mono text-[13px] leading-relaxed text-neutral-800">
      {children}
    </pre>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-neutral-800">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-neutral-300 accent-neutral-800"
      />
      <span className="font-mono">{label}</span>
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bloque Zara                                                                */
/* -------------------------------------------------------------------------- */

function ZaraBlock() {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    s1: true,
    s2: false,
    s3: false,
  });

  const timeSlots = useMemo(
    () =>
      ZARA_SLOTS.filter((s) => selected[s.id]).map(({ start, end }) => ({
        start,
        end,
      })),
    [selected],
  );

  const body = {
    order_id: "ES-2026-88213",
    time_slots: timeSlots,
  };

  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight">
        Zara — franjas horarias flexibles
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        El array <code className="font-mono">time_slots</code> admite tantas
        franjas como el cliente necesite. Marca varias a la vez.
      </p>

      <div className="mt-4 flex flex-col gap-2">
        {ZARA_SLOTS.map((s) => (
          <Checkbox
            key={s.id}
            checked={!!selected[s.id]}
            onChange={(next) =>
              setSelected((prev) => ({ ...prev, [s.id]: next }))
            }
            label={`${s.start}–${s.end}`}
          />
        ))}
      </div>

      <div className="mt-5">
        <CodeBlock>
          <span className="text-neutral-500">POST /modify-delivery-date</span>
          {"\n"}
          {JSON.stringify(body, null, 2)}
        </CodeBlock>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bloque Bershka                                                             */
/* -------------------------------------------------------------------------- */

function BershkaBlock() {
  const [selected, setSelected] = useState<Record<BershkaField, boolean>>({
    slots: true,
    eta: true,
    carrier: false,
    warehouse: false,
    history: false,
  });

  const activeFields = BERSHKA_FIELDS.filter((f) => selected[f]);

  const filtered = useMemo(() => {
    const out: Record<string, unknown> = { order_id: FULL_RESPONSE.order_id };
    for (const f of activeFields) out[f] = FULL_RESPONSE[f];
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const filteredBytes = byteLength(filtered);
  const fullBytes = byteLength(FULL_RESPONSE);
  const saved = fullBytes - filteredBytes;
  const savedPct = Math.round((saved / fullBytes) * 100);

  const query = activeFields.join(",");

  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight">
        Bershka — sparse fieldset
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        El parámetro <code className="font-mono">?fields=</code> recorta la
        respuesta a lo imprescindible. <code className="font-mono">order_id</code>{" "}
        siempre se devuelve.
      </p>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {BERSHKA_FIELDS.map((f) => (
          <Checkbox
            key={f}
            checked={selected[f]}
            onChange={(next) =>
              setSelected((prev) => ({ ...prev, [f]: next }))
            }
            label={f}
          />
        ))}
      </div>

      <div className="mt-5">
        <CodeBlock>
          <span className="text-neutral-500">
            GET /modify-delivery-date?fields={query || "∅"}
          </span>
          {"\n"}
          {JSON.stringify(filtered, null, 2)}
        </CodeBlock>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-neutral-500">Respuesta filtrada</dt>
          <dd className="font-mono text-neutral-900">{filteredBytes} B</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Respuesta completa</dt>
          <dd className="font-mono text-neutral-900">{fullBytes} B</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Ahorro</dt>
          <dd className="font-mono text-neutral-900">
            {saved} B ({savedPct}%)
          </dd>
        </div>
      </dl>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded bg-neutral-100">
        <div
          className="h-full bg-neutral-800 transition-all"
          style={{
            width: `${Math.max(0, Math.min(100, (filteredBytes / fullBytes) * 100))}%`,
          }}
        />
      </div>
      <p className="mt-1 text-xs text-neutral-400">
        Tamaños medidos sobre el JSON serializado sin espacios (bytes UTF-8).
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Consola                                                                    */
/* -------------------------------------------------------------------------- */

export default function ApiConsole() {
  return (
    <div className="space-y-12">
      <ZaraBlock />
      <hr className="border-neutral-200" />
      <BershkaBlock />
    </div>
  );
}
