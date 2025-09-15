import React from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://urban-computing-machine-5gwj946rvqp2p44v-3000.app.github.dev/",
      },
    });

    if (error) {
      console.error("Error al confirmar el pago:", error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <PaymentElement className="mt-5"/>
        <button className="btn btn-warning mt-3 mb-3" 
        type="submit" disabled={!stripe}>
          Pagar
        </button>
      </form>
    </div>
  );
};