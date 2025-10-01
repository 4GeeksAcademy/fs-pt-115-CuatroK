// src/front/components/Carruseles/CarruselIzquierda.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getJoyasSearch } from "../../services/serviceApi";
import { useAuth } from "../../hooks/useAuth";
import FavoriteButton from "../public/FavoriteButton.jsx";
import "./CarruselEdges.css";

const STEP_CARDS = 2;
const CARD_W = 288;
const CARD_H = 420;
const GAP = 16;

const getFavId = (f) => {
  if (typeof f === "number" || typeof f === "string") return Number(f) || f;
  return f?.id ?? f?.jewell_id ?? f?.jewel_id ?? f?.product_id ?? null;
};

export function CarruselIzquierda({ category, highlighted }) {
  const [items, setItems] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const listRef = useRef(null);
  const autoplayRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getJoyasSearch();
        setItems(Array.isArray(data) ? data : (data?.items ?? []));
      } catch {
        setItems([]);
      }
    })();
  }, []);

  const favSet = useMemo(() => {
    const raw = Array.isArray(user?.favorites) ? user.favorites : [];
    return new Set(raw.map(getFavId).filter(Boolean));
  }, [user]);

  const passHighlight = (it) =>
    typeof it?.highlighted === "boolean" ? it.highlighted : !!it?.destacado;

  const cat = (category || "").toLowerCase();

  const filtered = useMemo(() => {
    const arr = (items || []).filter((it) => {
      const sameCat = (it?.category || "").toLowerCase() === cat;
      if (!sameCat) return false;
      return typeof highlighted === "boolean" ? passHighlight(it) === highlighted : true;
    });
    return arr.length ? [...arr, ...arr, ...arr] : [];
  }, [items, category, highlighted]);

  const euro = useMemo(
    () => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }),
    []
  );

  const abrir = (p) => {
    const idOSlug = p?.slug ? p.slug : String(p?.id ?? "");
    navigate(`/producto/${encodeURIComponent(idOSlug)}`);
  };

  const scrollByCards = (dir = 1) => {
    const viewport = listRef.current?.parentElement;
    if (!viewport) return;
    const delta = dir * (STEP_CARDS * (CARD_W + GAP));
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
  }, [filtered.length]);

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
        <div
          ref={listRef}
          className="ce-list"
          style={{ display: "flex", gap: GAP, padding: 0, scrollBehavior: "smooth" }}
        >
          {filtered.map((item, i) => {
            const isFav = favSet.has(item.id);
            return (
              <div
                key={`${item.id}-${i}`}
                className="card ce-card position-relative"
                role="button"
                onClick={() => abrir(item)}
                style={{ width: CARD_W, minWidth: CARD_W, height: CARD_H }}
              >
                <img
                  src={item.url_image}
                  alt={item.name || "Producto"}
                  className="card-img-top"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/600x400?text=Sin+imagen")}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name || "Sin nombre"}</h5>
                  <p className="card-text small flex-grow-1">
                    {item.description || "Sin descripción."}
                  </p>
                  <div className="mt-auto price">{euro.format(item.price)}</div>
                </div>

                {passHighlight(item) && <span className="badge top-right">Destacado</span>}

                <FavoriteButton itemId={item.id} initiallyActive={isFav} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="ce-panel left" style={{ width: CARD_W, height: CARD_H }}>
        <img src="/publicidad.png" alt="Colección destacada" />
      </div>

      <button className="ce-nav ce-next" onClick={() => scrollByCards(1)} aria-label="Siguiente">
        <i className="fa-solid fa-chevron-right" />
      </button>
    </div>
  );
}