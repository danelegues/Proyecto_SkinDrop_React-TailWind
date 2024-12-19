import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    createFloatingGifts();
    console.log('Idioma actual:', i18n.language);
    console.log('Traducciones disponibles:', i18n.store.data);
  }, [i18n.language]);

  const createFloatingGifts = () => {
    const container = document.querySelector('.gift-container');
    if (!container) return;

    const numberOfGifts = 25;

    for (let i = 0; i < numberOfGifts; i++) {
      const gift = document.createElement('div');
      gift.className = 'floating-gift';
      
      // Posición aleatoria
      gift.style.left = `${Math.random() * 100}%`;
      gift.style.top = `${Math.random() * 100}%`;
      
      // Animación aleatoria
      gift.style.animationDelay = `${Math.random() * 2}s`;
      gift.style.animationDuration = `${3 + Math.random() * 2}s`;

      container.appendChild(gift);
    }
  };

  return (
    <div className="h-auto min-h-[600px] w-full pt-[120px] mt-[-30px] flex flex-col items-center relative overflow-hidden px-4">
      {/* Título principal */}
      <div className="text-white text-[30px] mt-4 sm:text-[45px] md:text-[45px] lg:text-[60px] xl:text-[75px] sm:w-[90%] md:w-[80%] lg:w-[80%] xl:w-[70%] font-bowlby font-bold text-center leading-tight z-[999] transition-all duration-300">
        <h1>
          {t('home.hero.mainTitle', {
            defaultValue: 'TU SUERTE, TU ESTILO, MEJORA TUS SKINS Y DOMINA EL JUEGO'
          })}
        </h1>
      </div>
      {/* Imagen principal */}

      <div className="rotate-[25deg] mt-[-35px] sm:mt-[-40px] md:mt-[-45px] lg:mt-[-50px] relative z-[999] w-full flex justify-center transition-all duration-300">
        <img 
          className="w-[620px] sm:w-[650px] md:w-[650px] lg:w-[650px] xl:w-[650px] h-auto transition-all duration-300 " 
          src="/img/jake-yes-akgarenderedit_preview_rev_1.png" 
          alt="Hero" 
          id="imagenFrontal"
        />
      </div>

      {/* Banner naranja */}
      <div className="mt-[-10px] sm:mt-[-30px] md:mt-[-30px] lg:mt-[-30px] xl:mt-[-20px] mb-[200px] bg-[#ff8c00] w-[95%] sm:w-[90%] md:w-[80%] lg:w-[80%] xl:w-[55%] flex flex-col md:flex-row gap-[15px] rounded-[25px] p-[15px] md:p-[20px] z-[700] transition-all duration-300">
        <div className="w-full md:w-1/2 text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[38px] font-bowlby font-bold p-2 text-black transition-all duration-300 animate-expand-glow">
          <h1>
            {t('home.hero.bannerTitle', {
              defaultValue: 'LAS MEJORES SKINS AL MEJOR PRECIO'
            })}
          </h1>
        </div>
        <div className="w-full md:w-1/2 text-[15px] sm:text-[16px] md:text-[16px] font-bowlby p-2 text-black transition-all duration-300 animate-expand-glow" style={{animationDelay: '0.8s'}}>
          <p>
            {t('home.hero.bannerText', {
              defaultValue: 'Aprovecha ahora las ofertas de navidades de hasta el 40%, y abre cajas como un loco!'
            })}
          </p>
          <button 
            className="mt-[15px] sm:mt-[20px] md:mt-[25px] bg-[#111] text-white w-[150px] sm:w-[160px] md:w-[170px] h-[35px] sm:h-[38px] md:h-[40px] p-[5px] rounded-[3px] border-none text-base sm:text-lg transition-all duration-300 hover:bg-[#222] hover:scale-105 hover:shadow-lg z-[1000]"
            onClick={() => navigate('/registro')}
          >
            {t('navbar.register')}
          </button>
        </div>
      </div>

      {/* Contenedor de regalos flotantes */}
      <div className="gift-container absolute w-full h-full top-0 left-0 pointer-events-none"></div>
    </div>
  );
};

export default Hero;
