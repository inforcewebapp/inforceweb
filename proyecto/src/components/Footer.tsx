import React from 'react';
import Quote from '../pages/Quote';
import Careers from '../pages/Careers';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {

  const location = useLocation();  
  const isServicesPage = location.pathname === '/services';

  return (
    <footer className="text-white">

      {/* CONTACTO */}
      <section className="bg-white py-16">
          <div className="flex justify-center mb-12">
              <h2 
                  className={`py-2 text-xl font-bold uppercase mx-auto flex items-center justify-center ${isServicesPage ? 'bg-[#2a3446] text-white' : 'bg-[#014fca] text-white'}`}
                  style={{ width: "1490px" }} // Ajusta este valor manualmente
              >
                  Contacto
              </h2>
          </div>
          <div className="container mx-auto px-6 flex flex-col md:flex-row md:items-end gap-8">
            {/* Imagen con texto arriba */}
            <div
              className="w-full md:w-2/5 flex flex-col items-center justify-end"
              style={{ transform: 'translateY(-280px)' }}
            >
              <div className={`text-center text-lg leading-snug font-medium mb-4" ${isServicesPage ? 'text-[#2a3446]' : 'text-[#014fca]'}`}
              style={{ transform: 'translateY(-40px)' }}
              >
                <p className="font-bold, text-2xl">Complete el</p>
                <p className="font-bold, text-2xl">formulario y escríbanos.</p>
                <p className="font-bold, text-2xl">En breve nos contactaremos</p>
                <p className="font-bold, text-2xl">con usted.</p>
              </div>
              <img
                src="/footer/consulta.png"
                alt="Consulta"
                className="max-w-full h-auto object-contain"
                style={{ maxHeight: '360px' }}
              />
            </div>


            {/* Formulario */}
            <div className="w-full md:w-3/5">
              <Quote />
            </div>
          </div>
      </section>

      {/* TRABAJÁ CON NOSOTROS */}
      <section className="bg-white py-16">
        <div className="flex justify-center mb-12">
            <h2 
                className={`py-2 text-xl font-bold uppercase mx-auto flex items-center justify-center ${isServicesPage ? 'bg-[#2a3446] text-white' : 'bg-[#014fca] text-white'}`}
                style={{ width: "1490px" }} // Ajusta este valor manualmente
            >
                Trabaja con nosotros
            </h2>
        </div>

        <div className="container mx-auto px-6 flex flex-col md:flex-row md:items-end gap-8">
            {/* Imagen con texto arriba */}
            <div
              className="w-full md:w-2/5 flex flex-col items-center justify-end"
              style={{ transform: 'translateY(-330px)' }}
            >
              <div className={`text-center text-lg leading-snug font-medium mb-4" ${isServicesPage ? 'text-[#2a3446]' : 'text-[#014fca]'}`}
              style={{ transform: 'translateY(-40px)' }}
              >
                <p className="font-bold, text-2xl">Completa el formulario</p>
                <p className="font-bold, text-2xl">y manda tu curriculum.</p>
                <p className="font-bold, text-2xl">¡Sumate a nuestro equipo!</p>

              </div>
              <img
                src="/footer/foter2.png"
                alt="Consulta"
                className="max-w-full h-auto object-contain"
                style={{ maxHeight: '360px' }}
              />
            </div>


            {/* Formulario */}
            <div className="w-full md:w-3/5">
              <Careers />
            </div>
          </div>
      </section>

      {/* BLOQUE AZUL FINAL */}
      <div className={`py-10 ${isServicesPage ? 'bg-[#2a3446]' : 'bg-[#014fca]'}`}>
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-start gap-8">

          {/* LADO IZQUIERDO: logo grande centrado */}
          <div className="flex justify-center md:justify-start items-center h-full">
            <img src={isServicesPage ? "/logo-azul.png" : "/logo.png"} 
            alt="INFORCE SEGURIDAD" 
            className="h-[120px] w-auto" />
          </div>

          {/* LADO DERECHO: texto alineado con el ícono de WhatsApp */}
          <div className="flex flex-col items-start text-left text-sm gap-3 leading-relaxed ">

            {/* WhatsApp + mensaje */}
            <a
              href="https://wa.me/543516424117"
              target="_blank"
              rel="noopener noreferrer"
              className="block no-underline"
            >
              <div className="flex items-center gap-3 ml-[210px] h-[70px]">
                <img
                  src="/logos/wpplogo.png"
                  alt="WhatsApp"
                  className="h-[70px] w-[85px]"
                />
                <div>
                  <p className="font-bold">¡Contáctanos!</p>
                  <p>Te asesoramos y cotizamos en la brevedad</p>
                </div>
              </div>
            </a>

            {/* Teléfono y dirección */}
            <div className="pl-[70px] ml-[150px]">
              <p>Tel: 4818269</p>
              <p>Mariano Larra 3375 - B° Urca</p>
              <p>Córdoba - Argentina</p>
            </div>

            {/* Redes sociales */}
            <div className="pl-[70px] flex space-x-4 ml-[150px]">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/logos/iglogo.png" alt="Instagram" className="h-[60px] w-[50px]" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="/logos/linkedinlogo.png" alt="LinkedIn" className="h-[60px] w-[46px]" />
              </a>
            </div>

            {/* Copyright */}
            <div className="pl-[70px] text-xs text-white/80 ml-[150px]">
              Copyright INFORCE © {new Date().getFullYear()} Todos los derechos reservados
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
