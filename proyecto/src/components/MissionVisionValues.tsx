import React from 'react';

const MissionVisionValues: React.FC = () => {
  const values = [
    {
      title: "Confianza",
      description: "Construimos relaciones sólidas y duraderas con nuestros clientes."
    },
    {
      title: "Confidencialidad", 
      description: "Garantizamos la protección absoluta de la información y procesos de cada cliente."
    },
    {
      title: "Profesionalismo",
      description: "Nuestro equipo humano se distingue por su preparación y compromiso."
    },
    {
      title: "Innovación",
      description: "Aplicamos tecnología de vanguardia e inteligencia artificial en tiempo real."
    },
    {
      title: "Orientación al cliente",
      description: "Adaptamos cada servicio a las necesidades específicas de quienes nos eligen."
    },
    {
      title: "Calidad y responsabilidad",
      description: "Garantizamos seguridad efectiva, constante y de excelencia."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      {/* Misión y Visión - Diseño Horizontal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Misión */}
        <div className="text-center">
          <div className="inline-block">
            <h3 className="heading text-3xl font-bold text-[#2a3446] mb-6">Misión</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-[#2a3446] to-[#1e2936] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Brindar servicios de seguridad privada con la más alta seriedad, honestidad y profesionalismo, priorizando la protección de nuestros clientes.
            </p>
          </div>
        </div>

        {/* Visión */}
        <div className="text-center">
          <div className="inline-block">
            <h3 className="heading text-3xl font-bold text-[#2a3446] mb-6">Visión</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-[#2a3446] to-[#1e2936] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Ser la empresa de seguridad líder en Córdoba y la región, reconocida por nuestra innovación, profesionalismo y capacidad de crear confianza. 
            </p>
          </div>
        </div>
      </div>

      {/* Valores - Diseño en Columnas Verticales */}
      <div className="space-y-12">
        <div className="text-center mb-12">
          <h3 className="heading text-3xl font-bold text-[#2a3446] mb-4">Nuestros Valores</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-[#014fca] to-[#0056d6] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Los principios fundamentales que guían nuestro trabajo diario
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <h4 className="heading font-bold text-xl text-[#2a3446] mb-3">{value.title}</h4>
              <div className="w-12 h-0.5 bg-gray-300 mx-auto mb-4"></div>
              <p className="text-gray-600 text-sm leading-relaxed px-2">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionVisionValues;
// import React from 'react';

// const MissionVisionValues: React.FC = () => {
//   const values = [
//     {
//       icon: "🤝",
//       title: "Confianza",
//       description: "Construimos relaciones sólidas y duraderas con nuestros clientes."
//     },
//     {
//       icon: "🔒",
//       title: "Confidencialidad", 
//       description: "Garantizamos la protección absoluta de la información y procesos de cada cliente."
//     },
//     {
//       icon: "👔",
//       title: "Profesionalismo",
//       description: "Nuestro equipo humano se distingue por su preparación y compromiso."
//     },
//     {
//       icon: "🚀",
//       title: "Innovación",
//       description: "Aplicamos tecnología de vanguardia e inteligencia artificial en tiempo real."
//     },
//     {
//       icon: "🎯",
//       title: "Orientación al cliente",
//       description: "Adaptamos cada servicio a las necesidades específicas de quienes nos eligen."
//     },
//     {
//       icon: "⭐",
//       title: "Calidad y responsabilidad",
//       description: "Garantizamos seguridad efectiva, constante y de excelencia."
//     }
//   ];

//   return (
//     <div className="space-y-16 px-6 md:px-12 lg:px-24 py-12 bg-gray-50">
//       {/* Misión y Visión */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* Misión */}
//         <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
//           <div className="text-center mb-4">
//             <h3 className="text-xl font-semibold text-gray-800 uppercase">Misión</h3>
//           </div>
//           <p className="text-gray-600 text-center leading-relaxed">
//             Brindar servicios de seguridad privada con la más alta seriedad, honestidad y profesionalismo, priorizando la protección de nuestros clientes.
//           </p>
//         </div>

//         {/* Visión */}
//         <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
//           <div className="text-center mb-4">
//             <h3 className="text-xl font-semibold text-gray-800 uppercase">Visión</h3>
//           </div>
//           <p className="text-gray-600 text-center leading-relaxed">
//             Ser la empresa de seguridad líder en Córdoba y la región, reconocida por nuestra innovación, profesionalismo y capacidad de crear confianza, marcando el estándar de excelencia en la protección de organizaciones y comunidades.
//           </p>
//         </div>
//       </div>

//       {/* Valores */}
//       <div>
//         <div className="text-center mb-10">
//           <h3 className="text-2xl font-semibold text-gray-800 uppercase">Valores</h3>
//           <div className="w-16 h-1 bg-gray-300 mx-auto mt-2 rounded-full"></div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {values.map((value, index) => (
//             <div 
//               key={index}
//               className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center"
//             >
//               <div className="text-3xl mb-3">{value.icon}</div>
//               <h4 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h4>
//               <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MissionVisionValues;
