import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaTwitter, FaFacebook, FaInstagram, FaDiscord, FaSteam } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-[#111] to-black text-gray-400">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Columna 1 */}
          <div className="space-y-4">
            <h3 className="text-[#f97316] font-semibold tracking-wide">
              {t('footer.about')}
            </h3>
            <p className="text-sm leading-relaxed opacity-80 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex gap-4 pt-4">
              <div className="bg-gray-800 px-3 py-1 rounded-md text-xs flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {t('footer.sslSecure')}
              </div>
              <div className="bg-gray-800 px-3 py-1 rounded-md text-xs flex items-center gap-2">
                <FaSteam className="text-[#f97316]" />
                {t('footer.steamPartner')}
              </div>
            </div>
          </div>

          {/* Columna 2 */}
          <div className="space-y-4">
            <h3 className="text-[#f97316] font-semibold tracking-wide">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.faq')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3 */}
          <div className="space-y-4">
            <h3 className="text-[#f97316] font-semibold tracking-wide">
              {t('footer.followUs')}
            </h3>
            <div className="flex gap-3">
              <a href="https://twitter.com" className="bg-gray-800 p-2 rounded-lg hover:bg-[#f97316] transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="https://facebook.com" className="bg-gray-800 p-2 rounded-lg hover:bg-[#f97316] transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com" className="bg-gray-800 p-2 rounded-lg hover:bg-[#f97316] transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="https://discord.com" className="bg-gray-800 p-2 rounded-lg hover:bg-[#f97316] transition-colors duration-300">
                <FaDiscord size={20} />
              </a>
            </div>
            <div className="mt-6 space-y-3">
              <p className="text-sm">{t('footer.newsletter')}</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder={t('footer.emailPlaceholder')}
                  className="bg-gray-800 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                />
                <button className="bg-[#f97316] text-white px-4 py-2 rounded-lg hover:bg-[#ea580c] transition-colors duration-300">
                  {t('footer.subscribe')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-center">
            © 2024 SkinDrop - {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
