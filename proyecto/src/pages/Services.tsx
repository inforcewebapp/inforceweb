import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Camera, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/slides/slide2.png',
    buttonText: 'Conocé Más',
    link: '/about'
  },
  {
    image: '/slides/slide1.png',
    buttonText: 'Más Información',
    link: '/services'
  }
];

const Services = () => {
  const [current, setCurrent] = useState(0);
  const location = useLocation();
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const isServicesPage = location.pathname === '/services';

  return (
    <div className="min-h-screen">
      {/* Carousel de imagenes */}
      <div className="relative w-full h-[75vh] overflow-hidden mt-[-64px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="relative w-full h-full overflow-hidden justify-center bg-black">
              <img
                src={slide.image}
                alt={`slide-${index}`}
                className="absolute w-full h-full object-cover"
                style={{ objectFit: 'fill', objectPosition: 'center' }}
              />
            </div>
            <div className="absolute inset-0">
              <Link to={slide.link}>
                <button className={`absolute left-[200px] bottom-[170px] text-sm px-4 py-2 rounded-full hover:bg-[#013f9e] ${isServicesPage ? 'bg-[#2a3446] text-white' : 'bg-[#014fca] text-white'}`}>
                  {slide.buttonText}
                </button>
              </Link>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === current ? 'bg-[#014fca]' : 'bg-white/60'
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* SEGURIDAD FÍSICA Y ELECTRÓNICA */}
      <section className="bg-white py-16 relative overflow-hidden">
        <div className="flex justify-center mb-12">
          <h2
            className={`w-full max-w-screen-xl mx-auto py-2 text-xl font-bold uppercase text-center ${
              isServicesPage ? 'bg-[#2a3446] text-white' : 'bg-[#014fca] text-white'
            }`}
          >
            SEGURIDAD FÍSICA Y ELECTRÓNICA
          </h2>
        </div>

        <div className="container mx-auto px-6 flex flex-col md:flex-row md:items-start gap-8">
          <div className="w-full md:w-2/5 flex flex-col items-center text-center gap-4">
            <div className={`text-lg font-medium ${isServicesPage ? 'text-[#2a3446]' : 'text-[#014fca]'}`}>
              <p className="font-bold text-2xl">Nos encargamos de la</p>
              <p className="font-bold text-2xl">vigilancia interior, exterior y</p>
              <p className="font-bold text-2xl">perimetral de las instalaciones</p>
              <p className="font-bold text-2xl">que necesites proteger</p>
            </div>
            <img
              src="/service/ss1.png"
              alt="Consulta"
              className="max-w-full h-auto object-contain max-h-72"
            />
          </div>

          <div className="w-full md:w-3/5 flex flex-col gap-10">
            <div className="text-[#2a3446] text-base">
              <p className="font-semibold text-3xl mb-2">¿Cómo trabajamos?</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Realizamos un análisis de riesgo, con los correspondientes planes de seguridad. Disuasión, prevención y control de daños.</li>
                <li>Identificamos y desarrollamos una estrategia predictiva y evolucionada con protocolos de seguridad y el uso de IA.</li>
                <li>Incorporamos personal capacitado.</li>
              </ul>
            </div>

            <div className="text-[#2a3446] text-base">
              <p className="font-semibold text-3xl mb-2">Seguridad física</p>
              <p>
                Nuestros vigiladores están habilitados por el Ministerio de Seguridad de la Provincia de Córdoba. Para lo cual cumplen todas las exigencias (capacitaciones, certificados, etc) de la Ley N° 10.571 y de la Ley N° 10954, en caso que porten armas menos letales.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row md:items-center gap-8">
          <div className="w-full md:w-3/5">
            <div className="text-[#2a3446] text-base mb-6">
              <p className="font-semibold text-3xl text-[#2a3446] mb-4">
                Videovigilancia de cámaras desde Bunker propio
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Para ver tu negocio, empresa, industria, cuando no está ahí. Previene delitos y ofrece tranquilidad</li>
                <li>Conexión de cámaras monitoreadas a la central de monitoreo de INFORCE</li>
                <li>Monitorear instalaciones en tiempo real y detecta intrusiones o eventos.</li>
                <li>El sistema genera alertas ante la detección de intrusos o actividad sospechosa, a través de sistemas analíticos con uso de IA.</li>
                <li>El personal de monitoreo responde de inmediato ante cualquier evento con protocolos normalizados.</li>
                <li>Siendo celosos de la privacidad de nuestros clientes. La confidencialidad es uno de nuestros valores.</li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-2/5 flex justify-center md:justify-end">
            <div className="overflow-hidden w-[350px] h-[350px]">
              <img
                src="/service/ss2.png"
                alt="Vigilancia"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
