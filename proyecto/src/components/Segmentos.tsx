const Segmentos = () => {
  const actividades = [
    {
      category: 'Constructoras e Industria',
    
      detailedDescription: 'Nuestra estrategia combina guardia física activa junto a monitoreo remoto para prevenir eficazmente robos, vandalismo e intrusiones no deseadas. Cada metro cuadrado está vigilado con la más alta tecnología y personal capacitado.',
      items: [
        { title: 'Constructoras', subtitle: 'Desarrollistas', image: '/segmentos/constructora.png' },
        { title: 'Industria', subtitle: 'Manufactura', image: '/segmentos/industria.png' }
      ]
    },
    {
      category: 'Empresas, Bancos y Shoppings',
      
      detailedDescription: ' Nuestros sistemas de vigilancia están diseñados específicamente para espacios comerciales, garantizando la seguridad de personal, clientes y activos durante todas las horas de operación.',
      items: [
        { title: 'Empresas', subtitle: 'Oficinas', image: '/segmentos/oficinas.png' },
        { title: 'Bancos', subtitle: 'Financiero', image: '/segmentos/bancos.png' },
        { title: 'Centros', subtitle: 'Comerciales', image: '/segmentos/retail.png' }
      ]
    },
    {
      category: 'Complejos, Countries e Instituciones',
      description: 'Cobertura integral para grandes complejos, countries e instituciones.',
      detailedDescription: 'Cubrimos cada metro cuadrado, implementando barreras de seguridad y personal especializado en cada punto de ingreso y salida al predio. Realizamos rondas periódicas de seguridad y vigilancia, complementadas con un monitoreo constante de todas las cámaras de seguridad instaladas estratégicamente.',
      items: [
        { title: 'Condominios', subtitle: 'Countries', image: '/segmentos/condominios.png' },
        { title: 'Hospitales', subtitle: 'Clínicas', image: '/segmentos/hospitales.png' },
        { title: 'Instituciones', subtitle: 'Educativas', image: '/segmentos/educativas.png' }
      ]
    },
    {
      category: 'Eventos Masivos',
     
      detailedDescription: 'Nuestros equipos están capacitados específicamente para gestionar multitudes, controlar accesos, y responder ante emergencias en entornos de alta concentración de personas, asegurando que cada asistente pueda disfrutar con tranquilidad de la experiencia.',
      items: [
        { title: 'Eventos', subtitle: 'Ferias', image: '/segmentos/eventos.png' },
        { title: 'Conciertos', subtitle: 'Recitales', image: '/segmentos/eventt.png' },
        { title: 'Eventos Deportivos', subtitle: 'Sociales', image: '/segmentos/event1.png' }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 w-full">
        <div className="flex justify-center mb-16 relative">
          <h2 className="heading text-3xl md:text-4xl font-extrabold text-gray-800 text-center bg-gradient-to-r from-[#014fca] to-[#0056d6] bg-clip-text text-transparent rounded-xl py-3 px-10 relative inline-block">
            Actividades en las que trabajamos
            <span className="absolute left-1/4 bottom-0 w-1/2 h-1 bg-blue-600 rounded-full"></span>
          </h2>
        </div>

        <div className="space-y-8">
          {actividades.map((categoria, categoryIndex) => (
            <div key={categoryIndex} className="space-y-12">
              {/* Título de categoría */}
              <div className="text-center ">
                <h3 className="heading text-2xl md:text-3xl font-bold text-[#2a3446]">
                  {categoria.category}
                </h3>
               
                {categoria.detailedDescription && (
                  <div className=" max-w-3xl mx-auto text-center">
                    <div className="p-5 ">
                      <p className="text-gray-700 text-base leading-relaxed">{categoria.detailedDescription}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Items de la categoría */}
              <div className={`grid gap-6 ${
                categoria.items.length === 1 
                  ? 'grid-cols-1 max-w-md mx-auto' 
                  : categoria.items.length === 2 
                  ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {categoria.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-[#2a3446]"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#2a3446] to-[#1e2936] rounded-full overflow-hidden shadow-md flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-xl text-[#2a3446] leading-tight">{item.title}</p>
                        <p className="font-semibold text-lg text-gray-600 leading-tight">{item.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Segmentos;
