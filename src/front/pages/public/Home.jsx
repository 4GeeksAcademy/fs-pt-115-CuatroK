
import { CarruselSecundario } from "../../components/public/CarruselSecundario.jsx";
import { Carrusel_principal } from "../../components/public/Carrusel_principal.jsx";
import { CarruselCategoria } from "../../components/Carruseles/CarruselCategoria.jsx"
import { Publicidad1 } from "../../components/publicidad/Publicidad1.jsx";
import { Publicidad2 } from "../../components/publicidad/Publicidad2.jsx";
import { Publicidad3 } from "../../components/publicidad/Publicidad3.jsx";
import { Publicidad4 } from "../../components/publicidad/Publicidad4.jsx";
import { useAuth0 } from "@auth0/auth0-react";

export const Home = () => {

  const { user } = useAuth0()

  return (

    <>
      <Carrusel_principal />

      <CarruselSecundario />

      <h1 className="text-center my-4">Destacados de Colgantes</h1>
      <CarruselCategoria category="colgantes" highlighted={true} />
      <Publicidad4 />

      <h1 className="text-center my-4">Destacados de pulseras</h1>
      <CarruselCategoria category="pulseras" highlighted={false} />
      <Publicidad2 />

      <h1 className="text-center my-4">Destacados de pendientes</h1>
      <CarruselCategoria category="pendientes" highlighted={false} />
      <Publicidad1 />

      <h1 className="text-center my-4">Destacados de relojes</h1>
      <CarruselCategoria category="relojes" highlighted={false} />
      <Publicidad3 />

      <h1 className="text-center my-4">Destacados de anillos</h1>
      <CarruselCategoria category="anillo" highlighted={false} />

    </>
  );

};