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
                <>
                    <h1
                        style={{
                            color: "white",
                            fontSize: "2.5rem",
                            marginBottom: "20px",
                            textShadow: "2px 2px 10px black",
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
                </>
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
          display: inline-block;
          animation: spinPulse 3s infinite linear;
          transform-origin: center center;
        }

        @keyframes spinPulse {
          0%   { transform: rotate(0deg) scale(1); }
          25%  { transform: rotate(90deg) scale(1.05); }
          50%  { transform: rotate(180deg) scale(1); }
          75%  { transform: rotate(270deg) scale(1.08); }
          100% { transform: rotate(360deg) scale(1); }
        }
      `}</style>
        </div>
    );
}