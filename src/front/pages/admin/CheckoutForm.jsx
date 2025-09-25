import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useAuth } from "../../hooks/useAuth";
import { postSale } from "../../services/serviceApi";
import { useNavigate } from "react-router-dom";

//const url = import.meta.env.VITE_BACKEND_URL + "/api";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  const { token, discount, finalAmount } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_STRIPE_RETURN_URL}`,
      },
      redirect: 'if_required'
    });

    if (error) {
      console.error("Error al confirmar el pago:", error.message);
    }
    else if (paymentIntent.status === "succeeded") {
      await postSale(finalAmount, discount, token);
      navigate("/success")
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