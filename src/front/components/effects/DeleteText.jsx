import { motion } from "framer-motion";

export const DeleteText = () => {
    return (
        <div style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%", height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            borderRadius: "8px"
        }}>
            <div style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>
                Eliminando
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                    ...
                </motion.span>
            </div>
        </div>
    )
}