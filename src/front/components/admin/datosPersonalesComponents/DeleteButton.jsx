import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DeleteButton({ DeleteAddress }) {
    const [confirming, setConfirming] = useState(false);

    return (
        <div style={{ position: "relative", width: "100px", height: "50px" }}>
            {/* Botón de confirmación */}
            <AnimatePresence>
                {confirming && (
                    <motion.button
                        key="confirm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            background: "#f87171", // rojo suave
                            border: "none",
                            borderRadius: "8px",
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                        onClick={DeleteAddress}
                    >
                        ¿Estás seguro?
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Botón de eliminar */}
            <motion.button
                type="button"
                key="delete"
                animate={confirming ? { x: -120, opacity: 0 } : { x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "#ef4444", // rojo fuerte
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
                onClick={() => setConfirming(true)}
            >
                <i class="fa-solid fa-circle-minus fa-2x my-auto text-danger border border-dark rounded-circle border-3" ></i>
            </motion.button>
        </div>
    );
}