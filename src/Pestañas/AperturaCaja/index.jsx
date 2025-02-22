// index.jsx
import React, { useEffect, useState } from 'react';
import './styles.css';

const AperturaCaja = () => {
  const [isAnimationStopped, setIsAnimationStopped] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const cardsJSON = [
    { id: "tarjeta1", name: "AK47 MADERA AZUL", imgArma: "/img/akruleta.png", animationDelay:"0s", boxShadow: "0px 0px 10px rgb(0, 102, 255)"},
    { id: "tarjeta2", name: "AUG FLORES", imgArma: "/img/aung.png", animationDelay:"-0.25s", boxShadow: "0px 0px 10px rgb(0, 102, 255)"},
    { id: "tarjeta3", name: "GLOCK-18 MARINA", imgArma: "/img/glock.png", animationDelay:"-0.5s", boxShadow: "0px 0px 10px rgb(0, 102, 255)"},
    { id: "tarjeta4", name: "SCOUT ARENA FINA", imgArma: "/img/scout.png", animationDelay:"-0.75s", boxShadow: "0px 0px 10px rgb(0, 102, 255)"},
    { id: "tarjeta5", name: "M4A4 HOWL", imgArma: "/img/howl.png", animationDelay:"-1s", boxShadow: "0px 0px 10px rgb(255, 0, 0)"},
    { id: "tarjeta6", name: "AWP DAGON LORE", imgArma: "/img/dragonlore.png", animationDelay:"-1.25s", boxShadow: "0px 0px 10px rgb(255, 166, 0)"},
    { id: "tarjeta7", name: "KARAMBIT BLUE GEM", imgArma: "/img/karambitbluegem.png", animationDelay:"-1.5s", boxShadow: "0px 0px 10px rgb(0, 255, 128)"},
    { id: "tarjeta8", name: "GUANTES DE ARMAS", imgArma: "/img/guantes.png", animationDelay:"-1.75s", boxShadow: "0px 0px 10px rgb(255, 0, 0)"},
    { id: "tarjeta9", name: "FAMAS LINEAS ROJAS", imgArma: "/img/famas.png", animationDelay:"-2s", boxShadow: "0px 0px 10px rgb(0, 102, 255)"},
    { id: "tarjeta10", name: "DEAGLE TATUADA", imgArma: "/img/deagle.png", animationDelay:"-2.25s", boxShadow: "0px 0px 10px rgb(0, 102, 255)"},
    { id: "tarjeta11", name: "M4A4 INDUSTRIAL", imgArma: "/img/howl.png", animationDelay:"-2.5s", boxShadow: "0px 0px 10px rgb(255, 255, 0)"},
    { id: "tarjeta12", name: "BOWIE TIGER TOOTH", imgArma: "/img/bowie.png", animationDelay:"-2.75s", boxShadow: "0px 0px 10px rgb(255, 255, 0)"},
    { id: "tarjeta13", name: "GLOCK-18 SELVA", imgArma: "/img/glockSelva.png", animationDelay:"-3s", boxShadow: "0px 0px 10px rgb(255, 255, 0)"},
    { id: "tarjeta14", name: "UMP-45 NEON", imgArma: "/img/UMP.png", animationDelay:"-3.25s", boxShadow: "0px 0px 10px rgb(255, 0, 0)"},
    { id: "tarjeta15", name: "RECORTADA BESOS", imgArma: "/img/recortada.png", animationDelay:"-3.5s", boxShadow: "0px 0px 10px rgb(255, 0, 0)"},
    { id: "tarjeta16", name: "M4A1 BLANCO NUCLEAR", imgArma: "/img/M4A1.png", animationDelay:"-3.75s", boxShadow: "0px 0px 10px rgb(255, 0, 0)"}
  ];

  useEffect(() => {
    const cards = document.querySelectorAll(".tarjeta");
    const container = document.querySelector(".container");
    let angle = 0;
    let speed = 5;
    let animationStartTime = Date.now();
    let isAnimationStopped = false;

    function updateCards() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - animationStartTime;
      const radius = Math.min(container.offsetWidth, container.offsetHeight) / 4;

      cards.forEach((card, index) => {
        const cardAngle = angle + index * (360 / cards.length);
        const radian = (cardAngle * Math.PI) / 180;

        card.style.transform = `rotateY(${cardAngle}deg) translateZ(300px)`;
        card.style.zIndex = Math.round(1000 * Math.cos(radian));
      });

      if (elapsedTime < 3000) {
        angle += speed;
      } else if (speed > 0.01) {
        speed *= 0.985;
        angle += speed;
      } else if (!isAnimationStopped) {
        isAnimationStopped = true;
        setIsAnimationStopped(true);

        let closestCard = null;
        let highestZIndex = -Infinity;
        let selectedCardData = null;

        cards.forEach((card, index) => {
          const zIndex = parseInt(card.style.zIndex, 10);
          if (zIndex > highestZIndex) {
            highestZIndex = zIndex;
            closestCard = card;
            selectedCardData = cardsJSON[index];
          }
        });

        if (closestCard && selectedCardData) {
          closestCard.style.backgroundColor = "yellow";
          mostrarArma(selectedCardData);
        }
      }

      if (!isAnimationStopped) {
        requestAnimationFrame(updateCards);
      }
    }

    cards.forEach((card) => {
      card.style.position = "absolute";
      card.style.transition = "transform 0.1s linear";
    });

    updateCards();
  }, []);

  const mostrarArma = (cardData) => {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'block';
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
        {cardsJSON.sort(() => Math.random() - 0.5).map((card) => (
          <div 
            key={card.id} 
            className="tarjeta" 
            style={{
              backgroundImage: `url(${card.imgArma})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              boxShadow: card.boxShadow,
              animationDelay: card.animationDelay
            }}
          >
            <h3>{card.name}</h3>
          </div>
        ))}
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