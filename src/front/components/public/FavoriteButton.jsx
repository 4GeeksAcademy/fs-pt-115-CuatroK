// src/front/components/public/FavoriteButton.jsx
import { useEffect, useMemo, useState } from "react";
import { addFavorite, removeFavorite } from "../../services/serviceApi";
import { useAuth } from "../../hooks/useAuth";

const getFavId = (f) => {
  if (typeof f === "number" || typeof f === "string") return String(Number(f) || f);
  return String(f?.id ?? f?.jewell_id ?? f?.jewel_id ?? f?.product_id ?? "");
};

const lsKey = "fav:ids";

export default function FavoriteButton({ itemId, size = 18, className = "" }) {
  const { token, user } = useAuth();
  const itemKey = String(itemId);

  const userIds = useMemo(
    () =>
      Array.isArray(user?.favorites)
        ? user.favorites.map(getFavId).filter(Boolean)
        : [],
    [user]
  );

  const hydrate = () => {
    if (!window.__favIds) {
      let fromLs = [];
      try {
        fromLs = JSON.parse(localStorage.getItem(lsKey) || "[]").map(String);
      } catch {}
      window.__favIds = new Set([...fromLs, ...userIds]);
    } else if (userIds.length) {
      userIds.forEach((id) => window.__favIds.add(String(id)));
    }
    return window.__favIds;
  };

  const [isFav, setIsFav] = useState(() => hydrate().has(itemKey));

  useEffect(() => {
    const s = hydrate();
    setIsFav(s.has(itemKey));
    localStorage.setItem(lsKey, JSON.stringify(Array.from(s)));
  }, [itemKey, userIds]);

  useEffect(() => {
    const onChange = (ev) => {
      const { changedId, isFav: nowFav } = ev.detail || {};
      if (!changedId) return;
      const s = hydrate();
      if (nowFav) s.add(String(changedId));
      else s.delete(String(changedId));
      localStorage.setItem(lsKey, JSON.stringify(Array.from(s)));
      if (String(changedId) === itemKey) setIsFav(!!nowFav);
    };
    window.addEventListener("favorites:changed", onChange);
    return () => window.removeEventListener("favorites:changed", onChange);
  }, [itemKey]);

  const toggle = async (e) => {
    e.stopPropagation();
    if (!token || !itemKey) return;
    try {
      if (isFav) await removeFavorite(token, itemId);
      else await addFavorite(token, itemId);
      const next = !isFav;
      setIsFav(next);
      const s = hydrate();
      next ? s.add(itemKey) : s.delete(itemKey);
      localStorage.setItem(lsKey, JSON.stringify(Array.from(s)));
      window.dispatchEvent(
        new CustomEvent("favorites:changed", {
          detail: { changedId: itemKey, isFav: next },
        })
      );
    } catch {}
  };

  return (
    <button
      className={`btn-like ${className}`}
      onClick={toggle}
      aria-pressed={isFav}
      aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
      title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      <i
        className={isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"}
        style={{ color: isFav ? "#e0182d" : "#9aa1ac", fontSize: size }}
      />
    </button>
  );
}