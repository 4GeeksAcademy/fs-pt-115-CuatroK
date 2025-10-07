import { useState, useEffect } from "react";

export const Demagogo = () => {
    const [started, setStarted] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [bgColor, setBgColor] = useState("black");

    // 🎨 Fondo dinámico
    useEffect(() => {
        if (!showContent) return;

        const interval = setInterval(() => {
            const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
            setBgColor(randomColor);
        }, 500);

        return () => clearInterval(interval);
    }, [showContent]);

    // 👉 Tu video de YouTube
    const videoId = "ce5sdKxpE3s";
    const startTime = 60;
    const videoUrl = `https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1&rel=0`;

    const handleStart = () => {
        setFadeOut(true);
        setTimeout(() => {
            setStarted(true);
            setShowContent(true);
        }, 3000);
    };

    return (
        <div
            style={{
                backgroundColor: bgColor,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                transition: "background-color 0.5s linear",
            }}
        >
            {!started ? (
                <button
                    onClick={handleStart}
                    className={`start-btn ${fadeOut ? "fade-out" : ""}`}
                >
                    Comenzar...
                </button>
            ) : (
                <div>
                    <div
                        style={{
                            marginTop: "80px",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            overflow: "hidden", // evita que el texto desborde
                            fontSize: "8rem",
                            color: "rgba(0, 0, 0, 0.08)", // más sutil
                            zIndex: 0,
                            pointerEvents: "none",
                            userSelect: "none",
                            whiteSpace: "pre-wrap", // permite saltos de línea si el texto lo tiene
                            lineHeight: "1", // para que las líneas estén más juntas
                            textAlign: "center", // opcional
                        }}
                    >
                        Dema ga ge gi go gu Dema ga ge gi go gu Dema ga ge gi go gu Dema ga ge gi go gu Dema ga ge gi go gu Dema ga ge gi go gu Dema ga ge gi go gu Dema ga ge gi go gu Dema ga ge gi go gu Dema ga ge gi go gu Dema ga ge gi go gu Dema ga ge gi go gu Dema ga ge gi go gu
                    </div>

                    <h1 className="text-center"
                        style={{
                            color: "white",
                            fontSize: "2.5rem",
                            marginBottom: "20px",
                            textShadow: "2px 2px 10px red",
                            animation: "fadeInText 2s ease forwards",
                        }}
                    >
                        Bienvenido a los Demagogo
                    </h1>
                    <div className="video-wrapper">
                        <iframe
                            width="800"
                            height="450"
                            src={videoUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            {/* 🎨 Animaciones */}
            <style>{`
        .start-btn {
          font-size: 2rem;
          padding: 1rem 2rem;
          border-radius: 10px;
          cursor: pointer;
          border: none;
          background: white;
          opacity: 0;
          animation: fadeIn 3s forwards;
          transition: opacity 3s ease;
        }

        .fade-out {
          opacity: 0 !important;
        }

        @keyframes fadeIn {
          from { opacity: 0; background: black; color: black; }
          to { opacity: 1; background: white; color: black; }
        }

        @keyframes fadeInText {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* 🎶 Video que gira y palpita */
      .video-wrapper {
  display: block;
  width: 800px;
  height: 450px;
  transform-origin: center center;
  animation: spinPulse 1.03s infinite linear;
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
  display: block;
}

/* Rotación + pulso juntos */
@keyframes spinPulse {
  0%   { transform: rotate(0deg) scale(1); }
  25%  { transform: rotate(90deg) scale(1.5); }
  50%  { transform: rotate(180deg) scale(1); }
  75%  { transform: rotate(270deg) scale(0.8); }
  100% { transform: rotate(360deg) scale(1); }
}
`}</style>
        </div>
    );
}