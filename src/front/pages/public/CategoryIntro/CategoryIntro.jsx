import React from "react";
const normalize = (raw = "") => {
    const s = String(raw || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .trim();

    const singular = s.endsWith("s") ? s.slice(0, -1) : s;
    return singular;
};

const DESCRIPTIONS = {
    anillo: {
        title: "Anillos",
        lead:
            "Nuestra colección de anillos combina artesanía y diseño atemporal, con piezas pensadas para el uso diario y para momentos inolvidables.",
        bullets: [
            "Materiales: oro, plata, acero de alta calidad y acabados con recubrimientos de larga duración.",
            "Estilos: solitario, alianza, sello, cóctel y diseños minimalistas.",
            "Guía rápida: prioriza tu talla, el perfil del aro y el tipo de gema según tu estilo de vida."
        ],
        seo:
            "Descubre anillos elegantes y resistentes, con detalles que realzan tu personalidad. Ideales para regalo o uso cotidiano."
    },
    pendiente: {
        title: "Pendientes",
        lead:
            "Pendientes que equilibran ligereza y presencia: desde aros discretos hasta diseños con gema que iluminan el rostro.",
        bullets: [
            "Cierres: presión, rosca y aro con bisagra para máxima seguridad y comodidad.",
            "Estilos: botón, aro, trepadores y colgantes con distintos largos.",
            "Consejo: combina metales para un look moderno sin perder coherencia."
        ],
        seo:
            "Pendientes versátiles para cada día y ocasiones especiales, con acabados de alta calidad y cierres seguros."
    },
    pulsera: {
        title: "Pulseras",
        lead:
            "Pulseras diseñadas para acompañarte a todas horas: sutiles, con charms o contundentes como pieza protagonista.",
        bullets: [
            "Materiales: cadena, rígidas tipo esclava y correas textiles reforzadas.",
            "Ajuste: verifica longitud y tipo de cierre para un encaje cómodo.",
            "Tip de estilo: combina grosores para crear una pila equilibrada."
        ],
        seo:
            "Pulseras cómodas y resistentes con cierres fiables y un acabado pulido que se mantiene con el tiempo."
    },
    reloj: {
        title: "Relojes",
        lead:
            "Relojes que unen precisión y estética. Selecciona por tamaño de caja, material de correa y resistencia al agua.",
        bullets: [
            "Correas: acero, cuero y caucho; intercambiables para múltiples estilos.",
            "Resistencia al agua: desde uso diario hasta modelos aptos para natación.",
            "Mantenimiento: revisa batería/automático y limpia la caja con paño suave."
        ],
        seo:
            "Relojes con carácter propio, fabricados con componentes fiables y acabados duraderos."
    },
    collar: {
        title: "Collares",
        lead:
            "Collares que enmarcan el escote con elegancia: minimal, layering o con colgantes de autor.",
        bullets: [
            "Largos: choker, princesa y matinee para distintos escotes.",
            "Detalles: colgantes con gema, iniciales y formas orgánicas.",
            "Combina: juega con alturas y texturas para lograr dimensión."
        ],
        seo:
            "Collares con brillo sutil y cadenas bien calibradas para evitar nudos y conservar la caída perfecta."
    },
    brazalete: {
        title: "Brazaletes",
        lead:
            "Brazaletes de líneas fluidas y estructura sólida, pensados para resaltar la muñeca con un gesto de sofisticación.",
        bullets: [
            "Formatos: abiertos ajustables y cerrados tipo esclava.",
            "Acabados: pulido espejo, satinado y texturizados suaves.",
            "Fit: elige diámetro adecuado para comodidad sin presionar."
        ],
        seo:
            "Brazaletes de alta calidad que elevan cualquier conjunto con una silueta limpia y moderna."
    }
};

const buildFallback = (catSingular) => ({
    title: catSingular.charAt(0).toUpperCase() + catSingular.slice(1) + "s",
    lead:
        "Explora nuestra selección curada con materiales de calidad y acabados pensados para durar.",
    bullets: [
        "Materiales y recubrimientos de alto rendimiento.",
        "Diseños versátiles para uso diario y ocasiones especiales.",
        "Consejos de cuidado incluidos con cada pieza."
    ],
    seo:
        "Colección con equilibrio entre diseño y durabilidad. Encuentra la pieza ideal para tu estilo."
});

const CategoryIntro = ({ category }) => {
    const norm = normalize(decodeURIComponent(category || ""));
    const data = DESCRIPTIONS[norm] || buildFallback(norm);

    return (
        <section className="mb-3">
            <h1 className="mb-3">{data.title}</h1>
            <p className="catalogo-intro">{data.lead}</p>
            <ul className="catalogo-intro" style={{ marginTop: 8 }}>
                {data.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                ))}
            </ul>
            <p className="text-muted-soft" style={{ marginTop: 8 }}>{data.seo}</p>
        </section>
    );
};

export default CategoryIntro;
