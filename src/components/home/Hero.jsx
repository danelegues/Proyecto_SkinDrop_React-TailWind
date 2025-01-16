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
      
      gift.style.left = `${Math.random() * 100}%`;
      gift.style.top = `${Math.random() * 100}%`;
      gift.style.animationDelay = `${Math.random() * 2}s`;
      gift.style.animationDuration = `${3 + Math.random() * 2}s`;

      container.appendChild(gift);
    }
  };

  return (
    <div className="h-auto min-h-[37.5rem] w-full pt-28 -mt-8 flex flex-col items-center relative overflow-hidden px-2">
      {/* Título principal */}
      <div className="text-white text-[clamp(1.9rem,6vw,5rem)] mt-4 font-bowlby font-bold text-center leading-tight z-[999] transition-all duration-300 w-[clamp(82%,85%,90%)]">
        <h1>
          {t('home.hero.mainTitle', {
            defaultValue: 'TU SUERTE, TU ESTILO, MEJORA TUS SKINS Y DOMINA EL JUEGO'
          })}
        </h1>
      </div>
      {/* Imagen principal */}
      <div className="rotate-[25deg] -mt-8 sm:-mt-10 md:-mt-12 lg:-mt-14 relative z-[999] w-full flex justify-center transition-all duration-300">
        <img 
          className="w-full max-w-[40.625rem] h-auto transition-all duration-300" 
          src="/img/jake-yes-akgarenderedit_preview_rev_1.png" 
          alt="Hero" 
          id="imagenFrontal"
        />
      </div>

      {/* Banner naranja */}
      <div className="mt-2 sm:-mt-8 mb-48 max-w-4xl bg-[#ff8c00] w-[clamp(55%,70%,70%)] flex flex-col md:flex-row gap-4 rounded-[1.5625rem] p-4 md:p-5 z-[700] transition-all duration-300">
        <div className="w-full md:w-1/2 text-[clamp(1.75rem,4vw,2.5rem)] font-bowlby font-bold p-2 text-black transition-all duration-300">
          <h1>
            {t('home.hero.bannerTitle', {
              defaultValue: 'LAS MEJORES SKINS AL MEJOR PRECIO'
            })}
          </h1>
        </div>
        <div className="w-full md:w-1/2 text-[clamp(0.9375rem,2vw,1rem)] font-bowlby p-2 text-black transition-all duration-300">
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
