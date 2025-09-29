import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getJoyasSearch, addFavorite, removeFavorite } from "../../services/serviceApi";
import { useAuth } from "../../hooks/useAuth";
import "./CarruselEdges.css";

const STEP_CARDS = 2;
const CARD_W = 288;
const CARD_H = 420;
const GAP = 16;

export function CarruselIzquierda({ category, highlighted }) {
  const [items, setItems] = useState([]);
  const [fav, setFav] = useState(() => new Set());
  const { token } = useAuth();
  const navigate = useNavigate();
  const listRef = useRef(null);
  const autoplayRef = useRef(null);

  const [cardW, setCardW] = useState(CARD_W);
  const [cardH, setCardH] = useState(CARD_H);
  const [step, setStep] = useState(STEP_CARDS);

  useEffect(() => {
    const xs = window.matchMedia("(max-width: 575.98px)");
    const sm = window.matchMedia("(max-width: 767.98px)");
    const apply = () => {
      if (xs.matches) { setCardW(220); setCardH(360); setStep(1); return; }
      if (sm.matches) { setCardW(260); setCardH(400); setStep(1); return; }
      setCardW(CARD_W); setCardH(CARD_H); setStep(STEP_CARDS);
    };
    apply();
    xs.addEventListener("change", apply);
    sm.addEventListener("change", apply);
    return () => { xs.removeEventListener("change", apply); sm.removeEventListener("change", apply); };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getJoyasSearch();
        setItems(Array.isArray(data) ? data : (data?.items ?? []));
      } catch { setItems([]); }
    })();
  }, []);

  const passHighlight = (it) => (typeof it?.highlighted === "boolean" ? it.highlighted : !!it?.destacado);
  const cat = (category || "").toLowerCase();

  const filtered = useMemo(() => {
    const arr = (items || []).filter((it) => {
      const sameCat = (it?.category || "").toLowerCase() === cat;
      if (!sameCat) return false;
      return typeof highlighted === "boolean" ? passHighlight(it) === highlighted : true;
    });
    return arr.length ? [...arr, ...arr, ...arr] : [];
  }, [items, category, highlighted]);

  const euro = useMemo(() => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }), []);

  const abrir = (p) => {
    const idOSlug = p?.slug ? p.slug : String(p?.id ?? "");
    navigate(`/producto/${encodeURIComponent(idOSlug)}`);
  };

  const toggleFav = async (id) => {
    if (!token) return;
    try {
      if (fav.has(id)) await removeFavorite(token, id);
      else await addFavorite(token, id);
      setFav((prev) => {
        const n = new Set(prev);
        n.has(id) ? n.delete(id) : n.add(id);
        return n;
      });
    } catch {}
  };

  const scrollByCards = (dir = 1) => {
    const viewport = listRef.current?.parentElement;
    if (!viewport) return;
    const delta = dir * (step * (cardW + GAP));
    const atEnd = viewport.scrollLeft + viewport.clientWidth + delta >= viewport.scrollWidth - 2;
    if (atEnd && delta > 0) {
      viewport.scrollTo({ left: 0, behavior: "auto" });
      requestAnimationFrame(() => viewport.scrollBy({ left: delta, behavior: "smooth" }));
    } else if (viewport.scrollLeft + delta <= 0 && dir < 0) {
      viewport.scrollTo({ left: viewport.scrollWidth, behavior: "auto" });
      requestAnimationFrame(() => viewport.scrollBy({ left: delta, behavior: "smooth" }));
    } else {
      viewport.scrollBy({ left: delta, behavior: "smooth" });
    }
  };

  const stopAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current);
  }, []);

  const startAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current);
    if (filtered.length) autoplayRef.current = setInterval(() => scrollByCards(1), 3000);
  }, [filtered.length, cardW, step]);

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(autoplayRef.current);
  }, [startAutoplay]);

  if (!filtered.length) return null;

  return (
    <div
      className="ce-row"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      onTouchStart={stopAutoplay}
      onTouchEnd={startAutoplay}
    >
      <button className="ce-nav ce-prev" onClick={() => scrollByCards(-1)} aria-label="Anterior">
        <i className="fa-solid fa-chevron-left" />
      </button>

      <div className="ce-viewport">
        <div ref={listRef} className="ce-list" style={{ display: "flex", gap: GAP, padding: 0, scrollBehavior: "smooth" }}>
          {filtered.map((item, i) => {
            const isFav = fav.has(item.id);
            return (
              <div
                key={`${item.id}-${i}`}
                className="card ce-card position-relative"
                role="button"
                onClick={() => abrir(item)}
                style={{ width: cardW, minWidth: cardW, height: cardH }}
              >
                <img
                  src={item.url_image}
                  alt={item.name || "Producto"}
                  className="card-img-top"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/600x400?text=Sin+imagen")}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name || "Sin nombre"}</h5>
                  <p className="card-text small">{item.description || "Sin descripción."}</p>
                  <div className="mt-auto price">{euro.format(item.price)}</div>
                </div>

                {passHighlight(item) && <span className="badge top-right">Destacado</span>}

                {token && (
                  <button
                    className="btn-like"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFav(item.id);
                    }}
                    aria-pressed={isFav}
                    aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                    title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                  >
                    <i className={isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={{ color: isFav ? "#e0182d" : "#9aa1ac", fontSize: 18 }} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="ce-panel left" style={{ width: cardW, height: cardH }}>
        <img src="/publicidad.png" alt="Colección destacada" />
      </div>

      <button className="ce-nav ce-next" onClick={() => scrollByCards(1)} aria-label="Siguiente">
        <i className="fa-solid fa-chevron-right" />
      </button>
    </div>
  );
}