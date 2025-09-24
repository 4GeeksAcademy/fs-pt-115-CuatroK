import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import LoadingSpinner from "../../components/public/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const url = import.meta.env.VITE_BACKEND_URL + "/api";


export const Payment = () => {
  const { finalAmount } = useAuth()
  const [clientSecret, setClientSecret] = useState("");


  useEffect(() => {
    if (finalAmount) {
      fetch(`${url}/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount * 100 }),
      })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret))
        .catch(err => console.error("Error al obtener clientSecret:", err));
    }
    console.log(finalAmount)
  }, [finalAmount]);

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
    <LoadingSpinner />
  );
};