import React, { useState, useEffect } from 'react';

const Segmentos = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [logosPerView, setLogosPerView] = useState(4);

  const segmentos = [
    { title: 'Constructoras Desarrollistas', image: '/segmentos/constructora.png' },
    { title: 'Condominios Barrios Cerrados', image: '/segmentos/condominios.png' },
    { title: 'Centros Comerciales Retail', image: '/segmentos/retail.png' },
    { title: 'Industria Manufactura', image: '/segmentos/industria.png' },
    { title: 'Empresas Oficinas Compañías', image: '/segmentos/oficinas.png' },
    { title: 'Hospitales Clínicas', image: '/segmentos/hospitales.png' },
    { title: 'Instituciones Educativas', image: '/segmentos/educativas.png' },
    { title: 'Eventos Ferias', image: '/segmentos/eventos.png' },
    { title: 'Bancos', image: '/segmentos/bancos.png' }
  ];

  const empresas = [
    '/empresas/dino.png',
    '/empresas/quimiguay.png',
    '/empresas/tecmaq.png',
    '/empresas/maluf.png',
    '/empresas/casonas.png',
    '/empresas/haus.png',
    '/empresas/bbc.png',
    '/empresas/betonmac.png',
    '/empresas/lindeno.png'
  ];

  // Ajustar logos por vista dependiendo del tamaño de pantalla
  useEffect(() => {
    const updateLogosPerView = () => {
      setLogosPerView(window.innerWidth < 768 ? 1 : 4);
    };
    updateLogosPerView();
    window.addEventListener('resize', updateLogosPerView);
    return () => window.removeEventListener('resize', updateLogosPerView);
  }, []);

  const visibleLogos = Array.from({ length: logosPerView }).map((_, i) => {
    const index = (startIndex + i) % empresas.length;
    return empresas[index];
  });

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % empresas.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + empresas.length) % empresas.length);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStartIndex((prev) => (prev + 1) % empresas.length);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [startIndex]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 w-full">
        <div className="flex justify-center mb-12">
          <h2 className="bg-[#014fca] text-white py-2 text-xl font-bold uppercase text-center w-full max-w-screen-xl mx-auto">
            SEGMENTOS
          </h2>
        </div>

        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {segmentos.map((segmento, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center bg-white text-[#014fca] py-6 px-4 rounded-lg shadow-lg transition-colors duration-300 hover:bg-[#014fca] hover:text-white"
            >
              <div className="absolute -top-10 w-24 h-24 bg-white rounded-full overflow-hidden shadow-md">
                <img src={segmento.image} alt={segmento.title} className="w-full h-full object-cover" />
              </div>
              <div className="mt-12 text-center">
                <p className="font-bold text-lg tracking-wide">{segmento.title.split(' ')[0]}</p>
                <p className="font-bold text-lg tracking-wide">{segmento.title.split(' ').slice(1).join(' ')}</p>
              </div>
            </div>
          ))}
        </div>

        {/* EMPRESAS QUE CONFÍAN EN NOSOTROS */}
        <div className="mt-20">
          <div className="flex justify-center mb-8">
            <h2 className="bg-[#014fca] text-white py-2 text-xl font-bold uppercase text-center w-full max-w-screen-xl mx-auto">
              Empresas que confían en nosotros
            </h2>
          </div>

          <div className="relative flex items-center justify-center">
            <button
              onClick={handlePrev}
              className="absolute left-0 z-10 p-2 text-[#014fca] hover:text-white hover:bg-[#014fca] rounded-full"
            >
              ‹
            </button>

            <div className="flex gap-10 justify-center items-center w-full max-w-6xl px-8 overflow-hidden">
              {visibleLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt={`empresa-${index}`}
                  className="h-10 md:h-16 object-contain"
                  style={{ minWidth: logosPerView === 1 ? '100%' : '300px' }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="absolute right-0 z-10 p-2 text-[#014fca] hover:text-white hover:bg-[#014fca] rounded-full"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Segmentos;
