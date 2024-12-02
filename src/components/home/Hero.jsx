import React, { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    createFloatingGifts();
  }, []);

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
      <div className="text-white text-[30px] sm:text-[35px] md:text-[45px] lg:text-[60px] xl:text-[70px] w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] font-bowlby font-bold text-center leading-tight z-[999] transition-all duration-300">
        <h1>
          TU SUERTE, TU ESTILO: MEJORA TUS SKINS Y DOMINA EL JUEGO.
        </h1>
      </div>
      {/* Imagen principal */}
      <div className="rotate-[34deg] mt-[-30px] sm:mt-[-35px] md:mt-[-40px] lg:mt-[-45px] relative z-[1000] w-full flex justify-center transition-all duration-300">
        <img 
          className="w-[250px] sm:w-[350px] md:w-[500px] lg:w-[700px] xl:w-[900px] h-auto transition-all duration-300 " 
          src="/img/jake-yes-akgarenderedit_preview_rev_1.png" 
          alt="Hero" 
          id="imagenFrontal"
        />
      </div>

      {/* Banner naranja */}
      <div className="mt-[-20px] sm:mt-[-70px] md:mt-[-100px] lg:mt-[-140px] xl:mt-[-180px] mb-[200px] bg-[#ff8c00] w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[44%] flex flex-col md:flex-row gap-[15px] rounded-[25px] p-[15px] md:p-[20px] z-[999] transition-all duration-300">
        <div className="w-full md:w-1/2 text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[42px] font-bowlby font-bold p-2 text-black transition-all duration-300 animate-expand-glow">
          <h1>LAS MEJORES SKINS AL MEJOR PRECIO</h1>
        </div>
        <div className="w-full md:w-1/2 text-[14px] sm:text-[15px] md:text-[16px] font-bowlby p-2 text-black transition-all duration-300 animate-expand-glow" style={{animationDelay: '0.8s'}}>
          <p>Aprovecha ahora las ofertas de navidades de hasta el 40%, y abre cajas como un loco!</p>
          <button className="mt-[15px] sm:mt-[20px] md:mt-[25px] bg-[#111] text-white w-[150px] sm:w-[160px] md:w-[170px] h-[35px] sm:h-[38px] md:h-[40px] p-[5px] rounded-[3px] border-none text-base sm:text-lg transition-all duration-300 hover:bg-[#222] hover:scale-105 hover:shadow-lg">
            Registrarse
          </button>
        </div>
      </div>

      {/* Contenedor de regalos flotantes */}
      <div className="gift-container absolute w-full h-full top-0 left-0 pointer-events-none"></div>
    </div>
  );
};

export default Hero;
