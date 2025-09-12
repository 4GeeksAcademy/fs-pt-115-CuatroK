import React, { useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import { CarruselSecundario } from "../../components/public/CarruselSecundario.jsx";
import { Carrusel_principal } from "../../components/public/Carrusel_principal.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const loadMessage = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

      const response = await fetch(`${backendUrl}/api/hello`);
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "set_hello", payload: data.message });
      } else {
        console.error("Backend responded with error:", data);
      }
      return data;
    } catch (error) {
      console.error(
        "Could not fetch the message from the backend. Please check if the backend is running and the backend port is public.",
        error
      );
    }
  };

  useEffect(() => {
    loadMessage();
  }, []);

  return (
    <>
      <Carrusel_principal />
      <CarruselSecundario />
    </>
  );
};