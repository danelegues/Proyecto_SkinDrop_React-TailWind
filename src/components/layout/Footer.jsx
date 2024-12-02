import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#141414] text-[#888] py-6 sm:py-10 w-full mt-8 sm:mt-12 font-sans">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-around px-4 sm:px-5 gap-6 sm:gap-8">
        {/* Sobre Nosotros */}
        <div className="flex-1 max-w-[300px] mx-3 sm:mx-5">
          <h4 className="text-orange-500 text-base sm:text-lg mb-3 sm:mb-5">
            Sobre Nosotros
          </h4>
          <p className="text-[#888] text-sm sm:text-base">
            SkinDrop es tu destino de confianza para cajas de skins de CS2.
          </p>
        </div>

        {/* Enlaces Rápidos */}
        <div className="flex-1 max-w-[300px] mx-3 sm:mx-5">
          <h4 className="text-orange-500 text-base sm:text-lg mb-3 sm:mb-5">
            Enlaces Rápidos
          </h4>
          <ul className="space-y-2 sm:space-y-2.5">
            <FooterLink href="#" text="Términos y Condiciones" />
            <FooterLink href="#" text="Política de Privacidad" />
            <FooterLink href="#" text="FAQ" />
            <FooterLink href="#" text="Contacto" />
          </ul>
        </div>

        {/* Síguenos */}
        <div className="flex-1 max-w-[300px] mx-3 sm:mx-5">
          <h4 className="text-orange-500 text-base sm:text-lg mb-3 sm:mb-5">
            Síguenos
          </h4>
          <div className="flex gap-3 sm:gap-4">
            <SocialLink href="#" icon="fa-twitter" />
            <SocialLink href="#" icon="fa-facebook" />
            <SocialLink href="#" icon="fa-instagram" />
            <SocialLink href="#" icon="fa-discord" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-6 sm:mt-10 pt-4 sm:pt-5 border-t border-white/10">
        <p className="text-[#888] text-xs sm:text-sm">
          &copy; 2024 SkinDrop - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, text }) => (
  <li>
    <Link 
      to={href} 
      className="text-[#888] text-sm sm:text-base hover:text-orange-500 transition-colors duration-300"
    >
      {text}
    </Link>
  </li>
);

const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    className="text-[#888] text-lg sm:text-xl hover:text-orange-500 transition-colors duration-300"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className={`fab ${icon}`}></i>
  </a>
);

export default Footer;
