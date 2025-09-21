
import { useEffect } from "react";
import { CarruselSecundario } from "../../components/public/CarruselSecundario.jsx";
import { Carrusel_principal } from "../../components/public/Carrusel_principal.jsx";
import { postCatalogo } from "../../services/postCatalogo.js";
import { catalogo } from "../../catalogo.js";
import { getJoyasSearch } from "../../services/serviceApi.js";

export const Home = () => {


  return (

    <>
      <Carrusel_principal />
      <CarruselSecundario />
    </>
  );

};