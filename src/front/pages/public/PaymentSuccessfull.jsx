import { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { postSale } from "../../services/serviceApi";

export const PaymentSuccessfull = () => {
    const stripe = useStripe();
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        const checkPayment = async () => {
            if (!stripe) return;

            const clientSecret = new URLSearchParams(window.location.search).get(
                "payment_intent_client_secret"
            );

            if (clientSecret) {
                const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

                if (paymentIntent && paymentIntent.status === "succeeded") {
                    await postSale(); 
                    setStatus("success");
                } else {
                    setStatus("failed");
                }
            } else {
                setStatus("not_found");
            }
        };

        checkPayment();
    }, [stripe]);

    if (status === "checking") return <p>Verificando pago...</p>;

    if (status === "success") {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>¡Pago exitoso!</h1>
                <p>Tu transacción se procesó correctamente.  </p>
                <h5>¡Recuerda entrar a tu perfil para ver los detalles de tu pedido!</h5>
                <a href="/">Volver al inicio</a>
            </div>
        );
    }

    if (status === "failed") {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>⚠️ Pago fallido</h1>
                <p>No pudimos confirmar tu transacción.</p>
                <a href="/">Volver al inicio</a>
            </div>
        );
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>🤔 No encontramos información del pago</h1>
            <a href="/">Volver al inicio</a>
        </div>
    );
}