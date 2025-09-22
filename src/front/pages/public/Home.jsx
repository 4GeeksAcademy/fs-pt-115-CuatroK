
import { CarruselSecundario } from "../../components/public/CarruselSecundario.jsx";
import { Carrusel_principal } from "../../components/public/Carrusel_principal.jsx";
import { CarruselCategoria } from "../../components/Carruseles/CarruselCategoria.jsx"

export const Home = () => {

  return (

    <>
      <Carrusel_principal />

      <CarruselSecundario />

      <CarruselCategoria category="colgantes" highlighted={true} />


      <CarruselCategoria category="pulseras" highlighted={false} />


      <CarruselCategoria category="pendientes" highlighted={false} />

    </>
  );

};