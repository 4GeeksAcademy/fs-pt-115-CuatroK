
import { CarruselSecundario } from "../../components/public/CarruselSecundario.jsx";
import { Carrusel_principal } from "../../components/public/Carrusel_principal.jsx";
import { CarruselCategoria } from "../../components/Carruseles/CarruselCategoria.jsx"

export const Home = () => {


  return (

    <>
      <Carrusel_principal />

      <CarruselSecundario />

    <h1 className="text-center my-4">Destacados de Colgantes</h1>
      <CarruselCategoria category="colgantes" highlighted={true} />

    <h1 className="text-center my-4">Destacados de pulseras</h1>
      <CarruselCategoria category="pulseras" highlighted={false} />

    <h1 className="text-center my-4">Destacados de pendientes</h1>
      <CarruselCategoria category="pendientes" highlighted={false} />

    <h1 className="text-center my-4">Destacados de relojes</h1>
      <CarruselCategoria category="relojes" highlighted={false} />

        <h1 className="text-center my-4">Destacados de anillos</h1>
      <CarruselCategoria category="anillo" highlighted={false} />

    </>
  );

};