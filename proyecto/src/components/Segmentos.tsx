import React, { useState, useEffect } from 'react';


//seguna parte del home
  const Segmentos = () => {

    const [startIndex, setStartIndex] = useState(0);
    const logosPerView = 4;

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
    // Obtener 4 logos desde el índice actual, en modo circular
    const visibleLogos = Array.from({ length: logosPerView }).map((_, i) => {
      const index = (startIndex + i) % empresas.length;
      return empresas[index];
    });


    // Avanzar manual
    const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % empresas.length);
    };

    // Retroceder manual
    const handlePrev = () => {
      setStartIndex((prev) =>
        (prev - 1 + empresas.length) % empresas.length
      );
    };


    // Auto-rotación cada 3s
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
                <h2 
                    className="bg-[#014fca] text-white py-2 text-xl font-bold uppercase mx-auto flex items-center justify-center"
                    style={{ width: "1600px" }} // Ajusta este valor manualmente
                >
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
              <h2 
                className="bg-[#014fca] text-white py-2 text-xl font-bold uppercase mx-auto flex items-center justify-center"
                style={{ width: "1600px" }}
              >
                Empresas que confían en nosotros
              </h2>
            </div>

            <div className="relative flex items-center justify-center">
              {/* Flecha izquierda */}
              <button
                onClick={handlePrev}
                className="absolute left-0 z-10 p-2 text-[#014fca] hover:text-white hover:bg-[#014fca] rounded-full"
              >
                ‹
              </button>

              {/* Logos visibles */}
              <div className="flex gap-10 justify-center items-center w-full max-w-6xl px-8">
                {visibleLogos.map((logo, index) => (
                  <img
                    key={index}
                    src={logo}
                    alt={`empresa-${index}`}
                    className="h-10 md:h-16 min-h-[120px] min-w-[300px] object-contain"
                  />
                ))}
              </div>

              {/* Flecha derecha */}
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