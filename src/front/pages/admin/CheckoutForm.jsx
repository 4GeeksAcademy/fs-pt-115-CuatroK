import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

//const url = import.meta.env.VITE_BACKEND_URL + "/api";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_STRIPE_RETURN_URL}/success`,
      },
    });


    if (error) {
      console.error("Error al confirmar el pago:", error.message);
    }

  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <PaymentElement className="mt-5" />
        <button className="btn btn-warning mt-3 mb-3"
          type="submit" disabled={!stripe}>
          Pagar
        </button>
      </form>
    </div>
  );
};