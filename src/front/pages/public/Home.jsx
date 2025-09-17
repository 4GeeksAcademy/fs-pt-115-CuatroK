
import { useEffect } from "react";
import { CarruselCollares } from "../../components/Carruseles/CarruselCollares.jsx";
import { CarruselSecundario } from "../../components/public/CarruselSecundario.jsx";
import { Carrusel_principal } from "../../components/public/Carrusel_principal.jsx";
import { postCatalogo } from "../../services/postCatalogo.js";
import { catalogo } from "../../catalogo.js";

export const Home = () => {

  useEffect (() => {
    const createCatalogo = async () => {
     await postCatalogo(catalogo.items)
    } 
    createCatalogo()
  },[])



  return (

    <>
      <Carrusel_principal />
      <CarruselSecundario />
      <CarruselCollares />
    </>
  );

};