// index.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';

const API_URL = 'http://10.14.4.197:8001/api';

const inventoryService = {
  async openCase(itemData) {
    try {
      const token = localStorage.getItem('token');
      
      console.log('Enviando datos al servidor:', {
        url: `${API_URL}/inventory`,
        data: itemData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const response = await axios({
        method: 'POST',
        url: `${API_URL}/inventory`,
        data: itemData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('Respuesta del servidor:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error detallado en openCase:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  }
};

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
      } 
      
      else if (speed > 0.01) {
        speed *= 0.985;
        angle += speed;
      } 
      
      else if (!isAnimationStopped) {
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

  const determinarRareza = (boxShadow) => {
    if (boxShadow.includes('rgb(255, 0, 0)')) return 'Covert'; // Rojo
    if (boxShadow.includes('rgb(255, 166, 0)')) return 'Classified'; // Naranja
    if (boxShadow.includes('rgb(0, 255, 128)')) return 'Restricted'; // Verde
    if (boxShadow.includes('rgb(0, 102, 255)')) return 'Mil-Spec'; // Azul
    return 'Consumer Grade';
  };

  const determinarPrecio = (boxShadow) => {
    if (boxShadow.includes('rgb(255, 0, 0)')) return 1500.00; // Rojo
    if (boxShadow.includes('rgb(255, 166, 0)')) return 500.00; // Naranja
    if (boxShadow.includes('rgb(0, 255, 128)')) return 250.00; // Verde
    if (boxShadow.includes('rgb(0, 102, 255)')) return 100.00; // Azul
    return 50.00;
  };

  const determinarCategoria = (name) => {
    if (name.includes('AK47')) return 'rifle';
    if (name.includes('M4A4') || name.includes('M4A1')) return 'rifle';
    if (name.includes('AWP')) return 'sniper';
    if (name.includes('GLOCK')) return 'pistol';
    if (name.includes('KARAMBIT') || name.includes('BOWIE')) return 'knife';
    if (name.includes('GUANTES')) return 'gloves';
    return 'other';
  };

  const mostrarArma = async (cardData) => {
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

    const itemData = {
      name: cardData.name,
      image_url: cardData.imgArma.replace('/img/', ''),
      price: determinarPrecio(cardData.boxShadow),
      rarity: determinarRareza(cardData.boxShadow),
      category: determinarCategoria(cardData.name),
      wear: 'Factory New',
      status: 'available'
    };

    try {
      const response = await inventoryService.openCase(itemData);
      console.log('Item añadido al inventario:', response);
    } catch (error) {
      console.error('Error al añadir el item al inventario:', error);
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