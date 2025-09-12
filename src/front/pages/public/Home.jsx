import React, { useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import { CarruselSecundario } from "../../components/public/CarruselSecundario.jsx";
import { Carrusel_principal } from "../../components/public/Carrusel_principal.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <>
      <Carrusel_principal />
      <CarruselSecundario />
    </>
  );
};