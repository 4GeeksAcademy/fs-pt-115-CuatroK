import React, { useEffect, useState } from "react";
import { getDailyMetal } from "../../services/metalApi2.0";

const KILATES = { "24k": 1.0, "22k": 0.9167, "18k": 0.75, "14k": 0.585 };
const PORCENTAJE = { 999: 0.999, 950: 0.95, 925: 0.925, 900: 0.9 };

const env = (k, fb = "") => {
  const v = typeof import.meta !== "undefined" ? import.meta.env : {};
  return (
    (v && (v[`VITE_${k}`] ?? v[k])) ||
    (typeof process !== "undefined" &&
      process.env &&
      (process.env[`REACT_APP_${k}`] ?? process.env[k])) ||
    fb
  );
};
const CURRENCY = env("CURRENCY", "EUR");

const toNonNegativeString = (value) => {
  if (value === "" || value === null || value === undefined) return "";
  const n = Number(value);
  if (!Number.isFinite(n)) return "";
  return String(Math.max(0, n));
};

export default function CalculadoraMetales() {
  const [gramsGold, setGramsGold] = useState("");
  const [gramsSilver, setGramsSilver] = useState("");
  const [silverPORCENTAJE, setSilverPORCENTAJE] = useState("999");
  const [state, setState] = useState({
    loading: true,
    error: "",
    gold: null,
    silver: null,
  });

  const nf = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: CURRENCY,
  });
  const fmt = (n) => (Number.isFinite(n) ? nf.format(n) : "—");

  const load = async (force = false) => {
    setState((s) => ({ ...s, loading: true, error: "" }));
    try {
      const { gold, silver } = await getDailyMetal({ force });
      setState({ loading: false, error: "", gold, silver });
    } catch (e) {
      setState({
        loading: false,
        error: e.message || "Error al consultar API",
        gold: null,
        silver: null,
      });
    }
  };

  useEffect(() => {
    load(false);
  }, []);

  const gG = Number(gramsGold || 0);
  const pgGold = state.gold?.priceGram ?? NaN;
  const goldPgr = fmt(pgGold);
  const gold24 = fmt(gG * (KILATES["24k"] ?? 1) * pgGold);
  const gold22 = fmt(gG * (KILATES["22k"] ?? 1) * pgGold);
  const gold18 = fmt(gG * (KILATES["18k"] ?? 1) * pgGold);
  const gold14 = fmt(gG * (KILATES["14k"] ?? 1) * pgGold);

  const gS = Number(gramsSilver || 0);
  const pgSilver = state.silver?.priceGram ?? NaN;
  const sFactor = PORCENTAJE[silverPORCENTAJE] || 1;
  const silverPgr = fmt(pgSilver);
  const silverVal = fmt(gS * sFactor * pgSilver);

  const tsGold = state.gold?.fetchedAt ? new Date(state.gold.fetchedAt).getTime() : 0;
  const tsSilver = state.silver?.fetchedAt ? new Date(state.silver.fetchedAt).getTime() : 0;
  const lastTs = Math.max(tsGold, tsSilver);
  const lastDate = lastTs ? new Date(lastTs).toLocaleDateString("es-ES") : "—";

  return (
    <>
      <style>{`
        .gold-text{color:#d4af37}
        .gold-border{border-color:#d4af37!important}
        .gold-pill{border:1px solid #d4af37;border-radius:999px;padding:.25rem .75rem;color:#d4af37;display:inline-block}
        .gold-line{height:2px;background:linear-gradient(90deg,rgba(212,175,55,0),#d4af37,rgba(212,175,55,0));margin:1rem 0;border:0}
        .info-card{background-color:transparent;border:1px solid rgba(212,175,55,.35);border-radius:1rem;padding:1.25rem}
        .shadow-soft{box-shadow:0 0 0 1px rgba(212,175,55,.25),0 10px 25px rgba(0,0,0,.25)}
        .rounded-soft{border-radius:1rem!important}
      `}</style>

      <div className="container bg-dark mt-5 mb-5 py-4 rounded-soft">
        <div className="row g-4">
          <div className="col-12">
            <div className="card bg-dark text-light border-secondary rounded-soft">
              <div className="card-body">
                <p className="text-center fs-4 fw-semibold mb-2">Calculadora de Metales</p>
                <p className="text-center text-secondary mb-2"><span className="gold-pill">Moneda: {CURRENCY}</span></p>
                <p className="text-center text-secondary mb-0">Última actualización: {lastDate}</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card bg-dark text-light border-secondary rounded-soft h-100">
              <div className="card-body">
                <p className="text-center fs-5 fw-semibold">Oro</p>
                <p className="text-center text-secondary">Precio por gramo: <span className="badge bg-secondary">{goldPgr}</span></p>
                <div className="mb-3">
                  <p className="form-label text-secondary mb-1">Gramos (oro)</p>
                  <input
                    id="gramsGold"
                    type="number"
                    className="form-control bg-dark text-light border-secondary rounded-soft"
                    placeholder="Ej: 7.5"
                    value={gramsGold}
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    onKeyDown={(e) => { if (e.key === "-") e.preventDefault(); }}
                    onChange={(e) => setGramsGold(toNonNegativeString(e.target.value))}
                  />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <div className="border border-secondary rounded-soft p-2">
                      <p className="text-secondary small mb-1">24k</p>
                      <p className="fw-bold text-white mb-0">{gold24}</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="border border-secondary rounded-soft p-2">
                      <p className="text-secondary small mb-1">22k</p>
                      <p className="fw-bold text-white mb-0">{gold22}</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="border border-secondary rounded-soft p-2">
                      <p className="text-secondary small mb-1">18k</p>
                      <p className="fw-bold text-white mb-0">{gold18}</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="border border-secondary rounded-soft p-2">
                      <p className="text-secondary small mb-1">14k</p>
                      <p className="fw-bold text-white mb-0">{gold14}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card bg-dark text-light border-secondary rounded-soft h-100">
              <div className="card-body">
                <p className="text-center fs-5 fw-semibold">Plata</p>
                <p className="text-center text-secondary">Precio por gramo: <span className="badge bg-secondary">{silverPgr}</span></p>
                <div className="mb-3">
                  <p className="form-label text-secondary mb-1">Gramos (plata)</p>
                  <input
                    id="gramsSilver"
                    type="number"
                    className="form-control bg-dark text-light border-secondary rounded-soft"
                    placeholder="Ej: 12.3"
                    value={gramsSilver}
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    onKeyDown={(e) => { if (e.key === "-") e.preventDefault(); }}
                    onChange={(e) => setGramsSilver(toNonNegativeString(e.target.value))}
                  />
                </div>
                <div className="mb-3">
                  <p className="form-label text-secondary mb-1">Ley (pureza)</p>
                  <select
                    id="PORCENTAJE"
                    className="form-select bg-dark text-light border-secondary rounded-soft"
                    value={silverPORCENTAJE}
                    onChange={(e) => setSilverPORCENTAJE(e.target.value)}
                  >
                    <option value="999">999</option>
                    <option value="950">950</option>
                    <option value="925">925</option>
                    <option value="900">900</option>
                  </select>
                </div>
                <div>
                  <div className="border border-secondary rounded-soft p-2">
                    <p className="text-secondary small mb-1">Valor estimado</p>
                    <p className="fw-bold text-white mb-0">{silverVal}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="info-card shadow-soft">
              <p className="fs-4 fw-semibold gold-text mb-2">Tipos de oro y sus características</p>
              <p className="mb-2">Guía rápida de referencias habituales en joyería y compra de metales.</p>
              <p className="gold-line" />
              <p className="mb-2"><span className="gold-pill me-2">Oro 24K</span>100% oro. Orientado a inversión, común en lingotes y monedas.</p>
              <p className="mb-2"><span className="gold-pill me-2">Oro 22K</span>≈92% oro. Muy usado en monedas de inversión.</p>
              <p className="mb-2"><span className="gold-pill me-2">Oro 18K</span>≈72% oro. Estándar en España por su dureza y calidad en joyería.</p>
              <p className="mb-2"><span className="gold-pill me-2">Oro 14K</span>≈50% oro. Opción más económica y resistente al uso diario.</p>
              <p className="gold-line" />
              <p className="fs-5 fw-semibold gold-text mb-2">¿Qué es esta calculadora?</p>
              <p className="mb-2">Herramienta orientativa que estima el valor según cotización actual, peso y pureza de la pieza. Los resultados pueden variar por la volatilidad del mercado y los márgenes aplicados por cada establecimiento.</p>
              <p className="gold-line" />
              <p className="fs-5 fw-semibold gold-text mb-2">¿Cómo te ayuda?</p>
              <p className="mb-2">• Valoración rápida de joyas, lingotes o monedas.</p>
              <p className="mb-2">• Comparación de precios entre proveedores.</p>
              <p className="mb-2">• Seguimiento de tendencias de mercado.</p>
              <p className="mb-2">• Planificación de compra o venta probando cantidades.</p>
              <p className="mb-2">• Mejor comprensión de los factores que influyen en el precio.</p>
              <p className="gold-line" />
              <p className="fs-5 fw-semibold gold-text mb-2">Factores clave del precio</p>
              <p className="mb-2">• Cotización spot internacional por onza troy.</p>
              <p className="mb-2">• Peso de la pieza en la unidad elegida.</p>
              <p className="mb-2">• Pureza: kilates en oro o ley en plata.</p>
              <p className="mb-2">• Tipo de cambio cuando la base está en USD.</p>
              <p className="gold-line" />
              <p className="mb-0">Nota: es habitual que existan primas y márgenes sobre el precio spot para cubrir fabricación, logística y servicio. Para operaciones importantes, busca asesoría profesional.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}