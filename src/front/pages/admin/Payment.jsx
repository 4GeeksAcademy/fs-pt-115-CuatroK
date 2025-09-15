import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("https://urban-computing-machine-5gwj946rvqp2p44v-3001.app.github.dev/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error("Error al obtener clientSecret:", err));
  }, []);

  const appearance = {
    theme: "flat",
    variables: { colorPrimaryText: "#262626" },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  ) : (
    <p>Cargando formulario de pago...</p>
  );
};