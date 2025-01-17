// index.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";

const AperturaCaja = () => {
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cardsJSON = [
    {
      id: "tarjeta1",
      probability: 0.1,
      name: "AK47 MADERA AZUL",
      imgArma: "/img/akruleta.png",
      animationDelay: "0s",
      boxShadow: "0px 0px 10px rgb(0, 102, 255)",
    },
    {
      id: "tarjeta2",
      probability: 0.1,
      name: "AUG FLORES",
      imgArma: "/img/aung.png",
      animationDelay: "-0.25s",
      boxShadow: "0px 0px 10px rgb(0, 102, 255)",
    },
    {
      id: "tarjeta3",
      probability: 0.1,
      name: "GLOCK-18 MARINA",
      imgArma: "/img/glock.png",
      animationDelay: "-0.5s",
      boxShadow: "0px 0px 10px rgb(0, 102, 255)",
    },
    {
      id: "tarjeta4",
      probability: 0.1,
      name: "SCOUT ARENA FINA",
      imgArma: "/img/scout.png",
      animationDelay: "-0.75s",
      boxShadow: "0px 0px 10px rgb(0, 102, 255)",
    },
    {
      id: "tarjeta5",
      probability: 0.05,
      name: "M4A4 HOWL",
      imgArma: "/img/howl.png",
      animationDelay: "-1s",
      boxShadow: "0px 0px 10px rgb(255, 0, 0)",
    },
    {
      id: "tarjeta6",
      probability: 0.05,
      name: "AWP DAGON LORE",
      imgArma: "/img/dragonlore.png",
      animationDelay: "-1.25s",
      boxShadow: "0px 0px 10px rgb(255, 166, 0)",
    },
    {
      id: "tarjeta7",
      probability: 0.05,
      name: "KARAMBIT BLUE GEM",
      imgArma: "/img/karambitbluegem.png",
      animationDelay: "-1.5s",
      boxShadow: "0px 0px 10px rgb(0, 255, 128)",
    },
    {
      id: "tarjeta8",
      probability: 0.05,
      name: "GUANTES DE ARMAS",
      imgArma: "/img/guantes.png",
      animationDelay: "-1.75s",
      boxShadow: "0px 0px 10px rgb(255, 0, 0)",
    },
    {
      id: "tarjeta9",
      probability: 0.05,
      name: "FAMAS LINEAS ROJAS",
      imgArma: "/img/famas.png",
      animationDelay: "-2s",
      boxShadow: "0px 0px 10px rgb(0, 102, 255)",
    },
    {
      id: "tarjeta10",
      probability: 0.05,
      name: "DEAGLE TATUADA",
      imgArma: "/img/deagle.png",
      animationDelay: "-2.25s",
      boxShadow: "0px 0px 10px rgb(0, 102, 255)",
    },
    {
      id: "tarjeta11",
      probability: 0.05,
      name: "M4A4 INDUSTRIAL",
      imgArma: "/img/howl.png",
      animationDelay: "-2.5s",
      boxShadow: "0px 0px 10px rgb(255, 255, 0)",
    },
    {
      id: "tarjeta12",
      probability: 0.05,
      name: "BOWIE TIGER TOOTH",
      imgArma: "/img/bowie.png",
      animationDelay: "-2.75s",
      boxShadow: "0px 0px 10px rgb(255, 255, 0)",
    },
    {
      id: "tarjeta13",
      probability: 0.05,
      name: "GLOCK-18 SELVA",
      imgArma: "/img/glockSelva.png",
      animationDelay: "-3s",
      boxShadow: "0px 0px 10px rgb(255, 255, 0)",
    },
    {
      id: "tarjeta14",
      probability: 0.05,
      name: "UMP-45 NEON",
      imgArma: "/img/UMP.png",
      animationDelay: "-3.25s",
      boxShadow: "0px 0px 10px rgb(255, 0, 0)",
    },
    {
      id: "tarjeta15",
      probability: 0.05,
      name: "RECORTADA BESOS",
      imgArma: "/img/recortada.png",
      animationDelay: "-3.5s",
      boxShadow: "0px 0px 10px rgb(255, 0, 0)",
    },
    {
      id: "tarjeta16",
      probability: 0.05,
      name: "M4A1 BLANCO NUCLEAR",
      imgArma: "/img/M4A1.png",
      animationDelay: "-3.75s",
      boxShadow: "0px 0px 10px rgb(255, 0, 0)",
    },
  ];

  const randomCards = useMemo(
    () => cardsJSON.sort(() => Math.random() - 0.5),
    []
  );

  useEffect(() => {
    const result = randomCards.reduce((acc, card) => {
      if (acc.length === 0) {
        acc.push(card.probability);
      } else {
        acc.push(acc[acc.length - 1] + card.probability);
      }
      return acc;
    }, []);

    const randomValue = Math.random();

    const cardIndex = result.findIndex((card) => randomValue < card);

    const winnerCard = cardsJSON[cardIndex];
    const winnerAngle = -(cardIndex * 360) / cardsJSON.length;
    const randomOffset = Math.random() * 16 - 8; // Random number between -8 and 8
    const targetAngle = winnerAngle + randomOffset;

    console.log(winnerCard, targetAngle);

    const cards = document.querySelectorAll(".tarjeta");

    let angle = 0;
    let speed = 5;
    let animationStartTime = Date.now();
    let isAnimationStopped = false;

    let lastTime = 0;

    let realTargetAngle = null;

    function updateCards() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - animationStartTime;
      if (lastTime === 0) {
        lastTime = currentTime;
      }
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (elapsedTime < 3000) {
        // Primera fase: velocidad constante
        angle += speed * (deltaTime / 16.67);
      } else {
        if (realTargetAngle === null) {
          // Calculamos cuántas vueltas completas queremos dar (3 en este caso)
          const extraRotations = 360 * 1;
          // Calculamos el ángulo actual módulo 360
          const currentAngleMod360 = angle % 360;
          // Calculamos cuánto nos falta para llegar al targetAngle
          const angleToTarget = (360 - currentAngleMod360 + targetAngle) % 360;
          // El ángulo final será las vueltas extra más lo que falta para llegar al target
          realTargetAngle = angle + angleToTarget + extraRotations;
        }

        if (angle < realTargetAngle) {
          // Calculamos la distancia restante al objetivo
          const remainingAngle = realTargetAngle - angle;

          // La velocidad disminuye más lentamente cuando estamos cerca del objetivo
          const slowdownFactor = Math.pow(
            Math.min(remainingAngle / 360, 1),
            0.8
          );
          const currentSpeed = speed * slowdownFactor;

          // Aplicamos la velocidad con el deltaTime
          angle += currentSpeed * (deltaTime / 16.67);
        } else {
          // Hemos llegado al final de la animación
          angle = realTargetAngle;
          isAnimationStopped = true;
          mostrarArma(winnerCard);
        }
      }

      if (!isAnimationStopped) {
        requestAnimationFrame(updateCards);
      }

      setRotationAngle(angle);
    }

    cards.forEach((card) => {
      card.style.position = "absolute";
      card.style.transition = "transform 0.1s linear";
    });

    updateCards();
  }, []);

  const mostrarArma = (cardData) => {
    const popup = document.getElementById("popup");
    if (popup) {
      popup.style.display = "block";
      popup.innerHTML = `
        <div class="popup-content">  
          <h2 id="popup-titulo">${cardData.name}</h2>
          <div id="popup-imagen-container">
            <img id="popup-imagen" src="${cardData.imgArma}" alt="Imagen de la carta">
          </div>
          <p id="popup-descripcion"></p>
          <button onclick="window.location.href='/'">Salir</button>
        </div>
      `;
    }
  };

  return (
    <div className="apertura-caja">
      <div className="nombreCaja">
        <h1 className="kenia-font">CAJA GAMMA</h1>
      </div>

      <div className="contenidoSuperior">
        <div className="punteroSuperior"></div>
        <div className="trianguloSuperior"></div>
      </div>

      <div className="container">
        {randomCards.map((card, index) => {
          const cardAngle = (index * 360) / cardsJSON.length + rotationAngle;
          const radian = (cardAngle * Math.PI) / 180;
          const radius = 300;
          return (
            <div
              key={card.id}
              className="tarjeta"
              style={{
                backgroundImage: `url(${card.imgArma})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                boxShadow: card.boxShadow,
                animationDelay: card.animationDelay,
                position: "absolute",
                transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                zIndex: Math.round(1000 * Math.cos(radian)),
              }}
            >
              <h3>{card.name}</h3>
            </div>
          );
        })}
      </div>

      <div className="contenidoInferior">
        <div className="trianguloInferior"></div>
        <div className="punteroInferior"></div>
      </div>

      <div id="popup" className="popup"></div>
    </div>
  );
};

export default AperturaCaja;
