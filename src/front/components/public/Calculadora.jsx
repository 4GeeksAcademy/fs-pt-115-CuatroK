import React, { useEffect, useState } from "react";
import { getDailyMetals } from "../../services/metalApi";

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

export default function CalculadoraMetales() {
  const [gramsGold, setGramsGold] = useState("");
  const [gramsSilver, setGramsSilver] = useState("");
  const [silverPORCENTAJE, setSilverPORCENTAJE] = useState("");
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
  const fmtTime = (t) => (t ? new Date(t).toLocaleString() : "—");

  const load = async (force = false) => {
    setState((s) => ({ ...s, loading: true, error: "" }));
    try {
      const { gold, silver } = await getDailyMetals({ force });
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

  return (
    <div className="container bg-dark mt-5 mb-5 py-4">
      <div className="row g-4">
        <div className="col-12">
          <div className="card bg-dark text-light border-secondary">
            <div className="card-body">
              <h3 className="card-title text-center mb-2">
                Calculadora de Metales
              </h3>
              <p className="text-center text-secondary mb-1">
                <h3>Moneda: EUR </h3>
              </p>
              <div className="text-center text-secondary mb-1">
                <p>Últ. oro: {fmtTime(state.gold?.fetchedAt)}</p>
                <p>Últ. Plata: {fmtTime(state.silver?.fetchedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6 ">
          <div className="card bg-dark text-light border-secondary h-100">
            <div className="card-body">
              <h5 className="card-title text-center">Oro</h5>
              <p className="text-center text-secondary">
                Precio por gramo:{" "}
                <span className="badge bg-secondary">{goldPgr}</span>
              </p>
              <div className="mb-3">
                <label
                  htmlFor="gramsGold"
                  className="form-label text-secondary"
                >
                  Gramos (oro)
                </label>
                <input
                  id="gramsGold"
                  type="number"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="Ej: 7.5"
                  value={gramsGold}
                  onChange={(e) => setGramsGold(e.target.value)}
                />
              </div>
              <div className="row g-2">
                <div className="col-6">
                  <div className="border border-secondary rounded p-2">
                    <div className="text-secondary small">24k</div>
                    <div className="fw-bold">{gold24}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="border border-secondary rounded p-2">
                    <div className="text-secondary small">22k</div>
                    <div className="fw-bold">{gold22}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="border border-secondary rounded p-2">
                    <div className="text-secondary small">18k</div>
                    <div className="fw-bold">{gold18}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="border border-secondary rounded p-2">
                    <div className="text-secondary small">14k</div>
                    <div className="fw-bold">{gold14}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card bg-dark text-light border-secondary h-100">
            <div className="card-body">
              <h5 className="card-title text-center">Plata</h5>
              <p className="text-center text-secondary">
                Precio por gramo:{" "}
                <span className="badge bg-secondary">{silverPgr}</span>
              </p>
              <div className="row g-3">
                <div className="col-12">
                  <label
                    htmlFor="gramsSilver"
                    className="form-label text-secondary"
                  >
                    Gramos (plata)
                  </label>
                  <input
                    id="gramsSilver"
                    type="number"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Ej: 12.3"
                    value={gramsSilver}
                    onChange={(e) => setGramsSilver(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label
                    htmlFor="PORCENTAJE"
                    className="form-label text-secondary"
                  >
                    Ley (pureza)
                  </label>
                  <select
                    id="PORCENTAJE"
                    className="form-select bg-dark text-light border-secondary"
                    value={silverPORCENTAJE}
                    onChange={(e) => setSilverPORCENTAJE(e.target.value)}
                  >
                    <option value="999">999</option>
                    <option value="950">950</option>
                    <option value="925">925</option>
                    <option value="900">900</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <div className="border border-secondary rounded p-2">
                  <div className="text-secondary small">Valor estimado</div>
                  <div className="fw-bold">{silverVal}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
