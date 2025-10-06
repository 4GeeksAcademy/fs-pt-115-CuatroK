// src/front/pages/public/Home.jsx
import React, { useRef } from "react";
import { Carrusel_principal } from "../../components/public/Carrusel_principal.jsx";
import { Publicidad4 } from "../../components/publicidad/Publicidad4.jsx";
import { Publicidad5 } from "../../components/publicidad/Publicidad5.jsx";
import VariableProximity from "../../components/effects/VariableProximity";
import { CarruselDerecha } from "../../components/Carruseles/CarruselDerecha.jsx";
import { CarruselIzquierda } from "../../components/Carruseles/CarruselIzquierda.jsx";

function VPTitle({ text, as: Tag = "h1", className = "text-center my-4" }) {
  const containerRef = useRef(null);
  return (
    <div ref={containerRef}
      style={{
        padding: "5px",
        margin: "25px",
        borderBottom: "4px double #d4b97a",
        backgroundColor: "#f5f0e6"
      }}>
      <Tag className={className} style={{ color: '#c2a15d' }}>
        <VariableProximity
          label={text}
          className="display-6"
          containerRef={containerRef}
          radius={140}
          falloff="linear"
          fromFontVariationSettings='"wght" 400, "opsz" 12'
          toFontVariationSettings='"wght" 900, "opsz" 36'
        />
      </Tag>
    </div >
  );
}

export const Home = () => {
  return (
    <div>
      <Carrusel_principal />
      <Publicidad5 />

      <VPTitle text="Destacados de colgantes" />
      <CarruselIzquierda category="colgantes" highlighted={true} />

      <VPTitle text="Destacados de pulseras" />
      <CarruselDerecha category="pulseras" highlighted={false} />

      <VPTitle text="Destacados de pendientes" />
      <CarruselIzquierda category="pendientes" highlighted={false} />

      <VPTitle text="Destacados de relojes" />
      <CarruselDerecha category="relojes" highlighted={false} />

      <VPTitle text="Destacados de anillos" />
      <CarruselIzquierda category="anillo" highlighted={false} />

      <Publicidad4 />
    </div>
  );
};