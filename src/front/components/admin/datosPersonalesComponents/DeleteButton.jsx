import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DeleteButton({ DeleteAddress }) {
    const [confirming, setConfirming] = useState(false);

    return (
        <div className="position-relative" style={{ width: "100px", height: "50px" }}>
            {/* Botón de confirmación */}
            <AnimatePresence>
                {confirming && (
                    <motion.button
                        key="confirm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="btn btn-warning"
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#f87171", // rojo suave
                            borderRadius: "0.5rem",
                            fontWeight: "bold",
                        }}
                        onClick={DeleteAddress}
                    >
                        Confirmar
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Botón de eliminar */}
            <motion.button
                type="button"
                key="delete"
                animate={confirming ? { x: -120, opacity: 0 } : { x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="btn btn-warning"
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#ef4444", // rojo fuerte
                    borderRadius: "0.5rem",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                }}
                onClick={() => setConfirming(true)}
            >
                <i className="fa-solid fa-circle-minus fa-2x text-white"></i>
            </motion.button>
        </div>
    );
}