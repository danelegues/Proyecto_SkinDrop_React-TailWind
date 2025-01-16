// index.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';

const AperturaCaja = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAnimationStopped, setIsAnimationStopped] = useState(false);
  const { boxData, items } = location.state || {};

  useEffect(() => {
    if (!boxData || !items) {
      navigate('/'); // Redirige al inicio si no hay datos
      return;
    }
    window.scrollTo(0, 0);
  }, []);

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
            selectedCardData = items[index];
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
  }, [items]);

  const mostrarArma = (cardData) => {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'block';
      popup.innerHTML = `
        <div class="popup-content">  
          <h2 id="popup-titulo">${cardData.name}</h2>
          <div id="popup-imagen-container">
            <img id="popup-imagen" src="${cardData.image_url}" alt="Imagen del item">
          </div>
          <p id="popup-descripcion">Rareza: ${cardData.rarity}</p>
          <button onclick="window.location.href='/'">Salir</button>
        </div>
      `;
    }
  };

  return (
    <div className="apertura-caja">
      <div className="nombreCaja">
        <h1 className="kenia-font">{boxData?.name || 'CAJA'}</h1>
      </div>

      <div className="contenidoSuperior">
        <div className="punteroSuperior"></div>
        <div className="trianguloSuperior"></div>
      </div>

      <div className="container">
        {items?.map((item) => (
          <div 
            key={item.id} 
            className="tarjeta" 
            style={{
              backgroundImage: `url(${item.image_url})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              boxShadow: getRarityShadow(item.rarity),
            }}
          >
            <h3>{item.name}</h3>
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

const getRarityShadow = (rarity) => {
  const shadows = {
    'common': '0px 0px 10px rgb(128, 128, 128)',
    'uncommon': '0px 0px 10px rgb(0, 102, 255)',
    'rare': '0px 0px 10px rgb(128, 0, 255)',
    'epic': '0px 0px 10px rgb(255, 0, 255)',
    'legendary': '0px 0px 10px rgb(255, 166, 0)',
    'mythical': '0px 0px 10px rgb(255, 0, 0)',
    'ancient': '0px 0px 10px rgb(255, 255, 0)',
    'default': '0px 0px 10px rgb(128, 128, 128)'
  };
  return shadows[rarity?.toLowerCase()] || shadows.default;
};

export default AperturaCaja;