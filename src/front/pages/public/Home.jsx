
import { useEffect } from "react";
import { CarruselSecundario } from "../../components/public/CarruselSecundario.jsx";
import { Carrusel_principal } from "../../components/public/Carrusel_principal.jsx";
import { postCatalogo } from "../../services/postCatalogo.js";
import { catalogo } from "../../catalogo.js";
import { getJoyasSearch } from "../../services/serviceApi.js";

export const Home = () => {

  useEffect(() => {
    const getjoyas = async () => {
      await getJoyasSearch()
    }
    getjoyas()
  }, [])



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