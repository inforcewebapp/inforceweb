// Componente mejorado de carrusel de empresas clientes

const ClientsSlider = () => {
  // Primera fila de empresas (logos existentes)
  const empresas1 = [
   
    "/empresas/quimiguay.png",
    "/empresas/tecmaq.png",
    "/empresas/maluf.png",
    "/empresas/casonas.png",
    "/empresas/haus.png",
    "/empresas/bbc.png",
    "/empresas/betonmac.png",
    "/empresas/lindeno.png",
    "/empresas/61.png",
    "/empresas/62.png",
    "/empresas/63.png",
    "/empresas/64.png",
    "/empresas/65.png",
  ];

  // Segunda fila de empresas (distinta para mayor variedad visual)
  const empresas2 = [
     "/empresas/dino.png",
    "/empresas/66.png",
    "/empresas/67.png",
    "/empresas/68.png",
    "/empresas/69.png",
    "/empresas/70.png",
    "/empresas/71.png",
    "/empresas/72.png",
    "/empresas/73.png",
    "/empresas/74.png",
    "/empresas/75.png",
    "/empresas/76.png",
    "/empresas/77.png",
  ];

  // Duplicar los arrays para crear loops infinitos
  const duplicatedEmpresas1 = [...empresas1, ...empresas1];
  const duplicatedEmpresas2 = [...empresas2, ...empresas2];

  return (
    <section className="py-12 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex justify-center mb-12 relative">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center bg-gradient-to-r from-[#014fca] to-[#0056d6] bg-clip-text text-transparent rounded-xl py-3 px-10 relative inline-block">
            Ellos ya están protegidos por Inforce
            {/* Línea decorativa debajo a la mitad */}
            <span className="absolute left-1/4 bottom-0 w-1/2 h-1 bg-blue-600 rounded-full"></span>
          </h2>
        </div>

        {/* Primera fila - movimiento hacia la derecha */}
        <div className="relative mb-[1rem] mt-4">
          <div className="flex animate-scroll-left">
            {duplicatedEmpresas2.map((logo, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 mx-1 md:mx-2 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`empresa-${index}`}
                  className="w-[180px] h-[110px] md:w-[380px] md:h-[240px] lg:w-[440px] lg:h-[280px] object-contain object-center transition-all duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Segunda fila - movimiento hacia la izquierda */}
        {/* Segunda fila - movimiento hacia la izquierda */}
        <div className="relative">
          <div className="flex animate-scroll-right">
            {duplicatedEmpresas1.map((logo, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 mx-3 md:mx-6 lg:mx-10 my-2 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`empresa-${index}`}
                  className="w-[100px] h-[60px] md:w-[180px] md:h-[110px] lg:w-[220px] lg:h-[130px] object-contain object-center transition-all duration-300 hover:scale-110"
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
