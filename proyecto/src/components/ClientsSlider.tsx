import React from 'react';

const ClientsSlider = () => {
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

  // Duplicar el array para crear un loop infinito
  const duplicatedEmpresas = [...empresas, ...empresas];

  return (
    <section className="py-16 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-6">
       
        <div className="flex justify-center mb-12 relative">
  <h2 
    className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center bg-gradient-to-r from-[#014fca] to-[#0056d6] bg-clip-text text-transparent rounded-xl py-3 px-10 relative inline-block"
  >
    Ellos ya están protegidos por Inforce
    {/* Línea decorativa debajo a la mitad */}
    <span className="absolute left-1/4 bottom-0 w-1/2 h-1 bg-blue-600 rounded-full"></span>
  </h2>
</div>

        {/* Primera fila - movimiento hacia la derecha */}
        <div className="relative mb-[5rem]">
          <div className="flex animate-scroll-right">
            {duplicatedEmpresas.map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-8">
                <img
                  src={logo}
                  alt={`empresa-${index}`}
                  className="h-12 md:h-16 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Segunda fila - movimiento hacia la izquierda */}
        <div className="relative">
          <div className="flex animate-scroll-left">
            {duplicatedEmpresas.map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-8">
                <img
                  src={logo}
                  alt={`empresa-${index}`}
                  className="h-12 md:h-16 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default ClientsSlider;
