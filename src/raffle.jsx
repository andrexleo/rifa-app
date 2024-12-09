import React, { useState, useEffect } from "react";
import "./raffleWheel.css"; // Importamos los estilos de la ruleta
import HeroBg from "./assets/boda1.jpg";
const BgStyle = {
  backgroundImage: `url(${HeroBg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  with: "100%",
  height: "100%",
};
const RaffleWheel = () => {
  const participants = [
    "1. Andrés",
    "2. María",
    "3. Pedro",
    "4. Lucía",
    "5. Carlos",
    "6. Ana",
    "7. Jorge",
    "8. Sofía",
  ];

  const [rotation, setRotation] = useState(0); // Control de rotación
  const [isSpinning, setIsSpinning] = useState(false); // Control del estado de giro
  const [winner, setWinner] = useState(""); // Almacena el ganador

  const spinWheel = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      const randomRotation = Math.floor(Math.random() * 5000) + 2000; // Grados aleatorios para el giro
      setRotation((prev) => prev + randomRotation); // Aumenta la rotación actual

      setTimeout(() => {
        const selectedParticipant = calculateWinner(randomRotation % 360);
        setWinner(selectedParticipant); // Almacena el ganador
        setIsSpinning(false);
      }, 5000); // Duración de la animación (5 segundos)
    }
  };

  const calculateWinner = (angle) => {
    const totalParticipants = participants.length;
    const anglePerParticipant = 360 / totalParticipants;
    const selectedIndex =
      Math.floor((angle + anglePerParticipant / 2) / anglePerParticipant) %
      totalParticipants;
    return participants[selectedIndex];
  };

  return (
    <div
      style={BgStyle}
      className="flex flex-row items-center justify-center min-h-screen"
    >
      <div className="grid grid-cols-2 gap-10 bg-white rounded-lg shadow-lg p-10 max-w-5xl w-full">
        <div className="bg-gray-100 p-5 rounded-lg">
          <h2 className="text-2xl font-bold text-pink-300 mb-4 text-center">
            Participantes
          </h2>
          <ul className="space-y-2">
            {participants.map((participant, index) => (
              <li
                key={index}
                className="bg-white p-2 rounded-lg shadow text-center text-gray-700"
              >
                {participant}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <h2 className="text-gray-600 text-3xl font-bold mb-6">
            Gira la Ruleta
          </h2>
          <div className="relative">
            {/* Flecha que apunta al ganador */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
              <div className="arrow"></div>
            </div>

            {/* Ruleta */}
            <div
              className="wheel bg-green-500"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? "transform 5s ease-out" : "none",
              }}
            >
              {participants.map((participant, index) => (
                <div
                  key={index}
                  className="wheel-segment"
                  style={{
                    transform: `rotate(${
                      (360 / participants.length) * index
                    }deg)`,
                  }}
                >
                  <span
                    style={{
                      transform: `rotate(${
                        -(360 / participants.length) * index
                      }deg)`,
                    }}
                  >
                    {participant}
                  </span>
                </div>
              ))}
            </div>

            {/* Botón en el centro */}
            <button
              onClick={spinWheel}
              className="absolute left-28 top-28 inset-0 flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 focus:outline-none"
              disabled={isSpinning}
            >
              Girar
            </button>
          </div>
        </div>

        {winner && (
          <p className="mt-6 text-black text-2xl font-bold">
            ¡El ganador es {winner}!
          </p>
        )}
      </div>
    </div>
  );
};

export default RaffleWheel;
