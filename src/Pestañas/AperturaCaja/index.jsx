// index.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import API_URL from '../../config/config.js';


const AperturaCaja = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [rotationAngle, setRotationAngle] = useState(0);
  const [items, setItems] = useState([]);

  // Función para determinar el color según la rareza
  function getRarityColor(rarity) {
    switch(rarity?.toLowerCase()) {
      case 'common':
        return 'rgb(0, 102, 255)';
      case 'rare':
        return 'rgb(255, 0, 0)';
      case 'legendary':
        return 'rgb(255, 166, 0)';
      default:
        return 'rgb(0, 102, 255)';
    }
  }

  // Efecto para verificar y procesar los datos iniciales
  useEffect(() => {
    if (!location.state?.boxData?.items) {
      navigate('/');
      return;
    }

    const processedItems = location.state.boxData.items.map(item => ({
      id: item.id,
      probability: item.probability || 0.1,
      name: item.name,
      imgArma: item.image_url || item.imgArma,
      animationDelay: "0s",
      boxShadow: `0px 0px 10px ${getRarityColor(item.rarity)}`,
    }));

    setItems(processedItems);
  }, [location.state, navigate]);

  // Scroll to top effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const randomCards = useMemo(
    () => items.sort(() => Math.random() - 0.5),
    [items]
  );

  useEffect(() => {
    if (items.length === 0) return;

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
    const winnerCard = items[cardIndex];
    const winnerAngle = -(cardIndex * 360) / items.length;
    const randomOffset = Math.random() * 16 - 8;
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
        angle += speed * (deltaTime / 16.67);
      } else {
        if (realTargetAngle === null) {
          const extraRotations = 360 * 1;
          const currentAngleMod360 = angle % 360;
          const angleToTarget = (360 - currentAngleMod360 + targetAngle) % 360;
          realTargetAngle = angle + angleToTarget + extraRotations;
        }

        if (angle < realTargetAngle) {
          const remainingAngle = realTargetAngle - angle;
          const slowdownFactor = Math.pow(
            Math.min(remainingAngle / 360, 1),
            0.8
          );
          const currentSpeed = speed * slowdownFactor;
          angle += currentSpeed * (deltaTime / 16.67);
        } else {
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
  }, [items, randomCards]);

  const handleWinnerItem = async (item) => {
    try {
      // Añadir console.log para debug
      console.log('Item a enviar:', {
        name: item.name,
        image_url: item.imgArma,
        rarity: item.rarity,
        category: item.category || 'weapon',
        wear: item.wear || 'Factory New',
        price: item.price || 0
      });

      const response = await axios.post(`${API_URL}/api/crates/open`, {
        name: item.name,
        image_url: item.imgArma,
        rarity: item.rarity,
        category: item.category || 'weapon',
        wear: item.wear || 'Factory New',
        price: item.price || 0
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      // Añadir el nuevo item a los drops recientes
      const newDrop = {
        id: Date.now(), // Generamos un ID único usando timestamp
        name: item.name,
        price: response.data.price || "0.00", // Asumiendo que el backend devuelve el precio
        image: item.imgArma
      };

      // Obtener drops existentes
      const existingDrops = JSON.parse(localStorage.getItem('recentDrops') || '[]');
      const updatedDrops = [newDrop, ...existingDrops].slice(0, 10);
      localStorage.setItem('recentDrops', JSON.stringify(updatedDrops));

      console.log('Respuesta:', response.data);
    } catch (error) {
      console.error('Error detallado:', error.response?.data || error.message);
    }
  };

  const mostrarArma = async (cardData) => {
    // Primero guardamos el item en el inventario
    await handleWinnerItem(cardData);

    const popup = document.getElementById("popup");
    if (popup) {
      popup.style.display = "block";
      popup.innerHTML = `
        <div class="popup-content">  
          <h2 id="popup-titulo">${cardData.name}</h2>
          <div id="popup-imagen-container">
            <img id="popup-imagen" src="${cardData.imgArma}" alt="${cardData.name}">
          </div>
          <p id="popup-descripcion"></p>
          <button class="popup-button">
            <span>Ir al inventario</span>
          </button>
        </div>
      `;

      // Añadir el event listener después de crear el botón
      const button = popup.querySelector('.popup-button');
      button.addEventListener('click', () => {
        window.location.href = '/inventario'; // Corregida la ruta
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="apertura-caja">
      <div className="nombreCaja">
        <h1 className="kenia-font">{location.state?.boxData?.name || "CAJA GAMMA"}</h1>
      </div>

      <div className="contenidoSuperior">
        <div className="punteroSuperior"></div>
        <div className="trianguloSuperior"></div>
      </div>

      <div className="container">
        {randomCards.map((card, index) => {
          const cardAngle = (index * 360) / items.length + rotationAngle;
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
