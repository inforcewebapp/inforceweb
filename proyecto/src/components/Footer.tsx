import React from 'react';
import Quote from '../pages/Quote';
import Careers from '../pages/Careers';
import { useLocation } from 'react-router-dom';
import CotizacionForm from '../pages/Quote';

const Footer: React.FC = () => {
  const location = useLocation();
  const isServicesPage = location.pathname === '/services';

  return (
    <footer className="text-white">

      {/* CONTACTO */}
      <section className="bg-white py-16">
        <div className="flex justify-center mb-12">
          <h2 className={`w-full max-w-screen-xl mx-auto py-2 text-xl font-bold uppercase text-center ${isServicesPage ? 'bg-[#2a3446]' : 'bg-[#014fca]'}`}>
            Contacto
          </h2>
        </div>

        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-2/5 flex flex-col items-center text-center gap-4">
            <div className={`text-lg font-medium ${isServicesPage ? 'text-[#2a3446]' : 'text-[#014fca]'}`}>
              <p className="font-bold text-2xl">Complete el formulario</p>
              <p className="font-bold text-2xl">y en breve nos contactaremos</p>
              <p className="font-bold text-2xl">con usted.</p>
            </div>
            <img src="/footer/consulta.png" alt="Consulta" className="w-full h-auto object-contain max-h-72" />
          </div>

          <div className="w-full md:w-3/5">
            <CotizacionForm />
          </div>
        </div>
      </section>

      {/* TRABAJÁ CON NOSOTROS */}
      <section className="bg-white py-16">
        <div className="flex justify-center mb-12">
          <h2 className={`w-full max-w-screen-xl mx-auto py-2 text-xl font-bold uppercase text-center ${isServicesPage ? 'bg-[#2a3446]' : 'bg-[#014fca]'}`}>
            Trabaja con nosotros
          </h2>
        </div>

        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-2/5 flex flex-col items-center text-center gap-4">
            <div className={`text-lg font-medium ${isServicesPage ? 'text-[#2a3446]' : 'text-[#014fca]'}`}>
              <p className="font-bold text-2xl">Completa el formulario</p>
              <p className="font-bold text-2xl">y envia tu curriculum.</p>
              <p className="font-bold text-2xl">¡Sumate a nuestro equipo!</p>
            </div>
            <img src="/footer/foter2.png" alt="Trabaja con nosotros" className="w-full h-auto object-contain max-h-72" />
          </div>

          <div className="w-full md:w-3/5">
            <Careers />
          </div>
        </div>
      </section>

      {/* BLOQUE AZUL FINAL (sin cambios) */}
      <div className={`py-10 ${isServicesPage ? 'bg-[#2a3446]' : 'bg-[#014fca]'}`}>
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-start gap-8">

          {/* Logo grande */}
          <div className="flex justify-center md:justify-start items-center h-full">
            <img src={isServicesPage ? "/logo-azul.png" : "/logo.png"} alt="INFORCE SEGURIDAD" className="h-[120px] w-auto" />
          </div>

          {/* WhatsApp, contacto y redes */}
          <div className="flex flex-col items-start gap-3 leading-relaxed">

            <a href="https://wa.me/543516424117" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <img src="/logos/wpplogo.png" alt="WhatsApp" className="h-[70px] w-[85px]" />
              <div>
                <p className="font-bold">¡Contáctanos!</p>
                <p>Te asesoramos y cotizamos a la brevedad</p>
              </div>
            </a>

            <div className="pl-[70px]">
              <p>Tel: (0351)4818269</p>
              <p>Mariano Larra 3375 - B° Urca</p>
              <p>Córdoba - Argentina</p>
            </div>

            <div className="pl-[70px] flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/logos/iglogo.png" alt="Instagram" className="h-[60px] w-[50px]" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="/logos/linkedinlogo.png" alt="LinkedIn" className="h-[60px] w-[46px]" />
              </a>
            </div>

            <div className="pl-[70px] text-xs text-white/80">
              Copyright INFORCE © {new Date().getFullYear()} Todos los derechos reservados
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
