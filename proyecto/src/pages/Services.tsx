import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type Slide = {
  image: string;

  link: string;
  fit?: "fill" | "centerCrop";
  scrollTo?: string;
};

const mobileSlides: Slide[] = [
  {
    image: "/monitoreo.png",
    link: "/services",
    scrollTo: "serviciosinfo",
  },
  {
    image: "/2.png",
    link: "/services",
    scrollTo: "serviciosinfo",
  },
  {
    image: "/3.png",
    link: "/services",
    scrollTo: "serviciosinfo",
  },
];

const desktopSlides: Slide[] = [
  {
    image: "/monitoreo.png",
    link: "/services",
    scrollTo: "serviciosinfo",
  },
  {
    image: "/5.png",
    link: "/services",
    scrollTo: "serviciosinfo",
  },
  {
    image: "/6.png",
    link: "/services",
    scrollTo: "serviciosinfo",
  },
];

const Services = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [current, setCurrent] = useState(0);
  const location = useLocation();
  const isServicesPage = location.pathname === "/services";

  useEffect(() => {
    if (location.state?.scrollTo === "serviciosinfo") {
      const el = document.getElementById("serviciosinfo");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Llamada inicial

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen">
      {/* Banner Carousel - Mismo estilo que Home */}
      <div
         className={`relative w-full overflow-hidden ${
    isMobile ? "mt-[45px]" : "mt-[50px]"
        }`}
      >
        <div className="aspect-[3/1] md:aspect-[30/9] lg:aspect-[14/4] max-h-[80vh]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={slide.image}
                alt={`slide-${index}`}
                className="w-full h-full object-cover object-top transition-all duration-1000"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"></div>

            {/* Botón de asesor - Oculto en banner 1 */}
            {slide.image !== "/monitoreo.png" && slide.image !== "/monitoreo.png" && (
              <div className="absolute right-4 md:right-8 lg:right-12 bottom-4 md:bottom-6 lg:bottom-8 z-20 hidden md:block">
                <a
                  href="https://wa.me/5493513584999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-3 
                            bg-gradient-to-r from-[#014fca] to-[#0056d6] 
                            text-white font-semibold rounded-xl shadow-2xl 
                            hover:shadow-lg hover:shadow-blue-500/50 
                            hover:from-[#0056d6] hover:to-[#014fca] 
                            hover:scale-105 transition-all duration-300 
                            backdrop-blur-sm border border-white/20"
                >
                  <div className="text-left">
                    <p className="text-xs font-bold leading-tight whitespace-nowrap">
                      Comunicate con un asesor
                    </p>
                  </div>
                </a>
              </div>
            )}
          </div>
        ))}
</div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === current ? "bg-[#014fca]" : "bg-white/60"
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* SEGURIDAD FÍSICA Y ELECTRÓNICA */}
      <section
        id="serviciosinfo"
        className="bg-white via-white to-blue-50 py-20 relative overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center bg-gradient-to-r from-[#2a3446] to-[#1e2936] bg-clip-text text-transparent rounded-xl py-3 px-10 relative inline-block">
              Seguridad Física y Electrónica
              <span className="absolute left-1/4 bottom-0 w-1/2 h-1 bg-gradient-to-r from-[#2a3446] to-[#1e2936] rounded-full"></span>
            </h2>
          </div>

          {/* Introducción principal */}
          <div className="text-center mb-16">
            <div className=" p-8  max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-[#2a3446] mb-6">
                Protección Integral 24/7
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nos especializamos en la vigilancia interior, exterior y
                perimetral de instalaciones, combinando personal altamente
                capacitado con tecnología de vanguardia para garantizar la
                máxima seguridad de tu empresa o propiedad.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Metodología de trabajo */}
            <div className="duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#2a3446] to-[#1e2936] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-[#2a3446]">
                  ¿Cómo trabajamos?
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#2a3446] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Análisis de riesgo:</strong> Evaluamos
                    vulnerabilidades y diseñamos planes de seguridad
                    personalizados con estrategias de disuasión, prevención y
                    control de daños.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#2a3446] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Estrategia predictiva:</strong> Desarrollamos
                    protocolos avanzados potenciados por inteligencia artificial
                    para anticipar y prevenir incidentes.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#2a3446] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Personal especializado:</strong> Incorporamos
                    vigiladores certificados y continuamente capacitados para
                    cada tipo de instalación.
                  </p>
                </div>
              </div>
            </div>

            {/* Imagen ilustrativa */}
            <div className="flex items-center justify-center">
              <div className="   duration-300 hover:scale-105">
                <img
                  src="/service/im.jpg"
                  alt="Seguridad Física"
                    className="w-[350px] h-[350px] object-cover rounded-full mx-auto"
                />
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 font-medium">
                    Protección y Prevención INFORCE
                  </p>
                  <p className="text-xs text-gray-500">
                    Planificación estratégica personalizada
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificaciones */}
          <div className="bg-white rounded-2xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#2a3446] to-[#1e2936] rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-[#2a3446]">
                Certificación y Legalidad
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Todos nuestros vigiladores están{" "}
              <strong>
                habilitados por el Ministerio de Seguridad de la Provincia de
                Córdoba
              </strong>
              , cumpliendo estrictamente con las exigencias de la{" "}
              <strong>Ley N° 10.571</strong> y la <strong>Ley N° 10.954</strong>
              para el porte de armas menos letales. Garantizamos el más alto
              nivel de profesionalismo y cumplimiento normativo.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center bg-gradient-to-r from-[#014fca] to-[#0056d6] bg-clip-text text-transparent rounded-xl py-3 px-10 relative inline-block">
              Videovigilancia Inteligente
              <span className="absolute left-1/4 bottom-0 w-1/2 h-1 bg-gradient-to-r from-[#014fca] to-[#0056d6] rounded-full"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contenido */}
            <div className="space-y-8">
              <div className=" duration-300 mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#014fca] to-[#0056d6] rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">📹</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#2a3446]">
                    Monitoreo desde Búnker Propio
                  </h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Vigilancia remota 24/7 desde nuestra central de monitoreo
                  especializada, equipada con tecnología de última generación y
                  personal altamente capacitado.
                </p>
              </div>

              {/* Características principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#014fca] hover:shadow-xl transition-shadow duration-300">
                  <h4 className="font-bold text-lg text-[#2a3446] mb-3">
                    🔗 Conectividad Total
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Conexión directa de cámaras a nuestra central de monitoreo
                    INFORCE para supervisión continua.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#014fca] hover:shadow-xl transition-shadow duration-300">
                  <h4 className="font-bold text-lg text-[#2a3446] mb-3">
                    ⚡ Tiempo Real
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Monitoreo instantáneo que detecta intrusiones y eventos
                    sospechosos al momento.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#014fca] hover:shadow-xl transition-shadow duration-300">
                  <h4 className="font-bold text-lg text-[#2a3446] mb-3">
                    🤖 IA Avanzada
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Sistemas analíticos con inteligencia artificial para alertas
                    precisas y reducción de falsas alarmas.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#014fca] hover:shadow-xl transition-shadow duration-300">
                  <h4 className="font-bold text-lg text-[#2a3446] mb-3">
                    🔒 Confidencialidad
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Máxima privacidad y confidencialidad en el manejo de
                    información de nuestros clientes.
                  </p>
                </div>
              </div>

              {/* Beneficios */}
              <div className="bg-gray-100  p-10 text-gray-800 max-w-4xl mx-auto">
                <h4 className="text-2xl font-extrabold mb-8 text-gray-900 border-b-2 border-blue-500 inline-block pb-2">
                  Beneficios Clave
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="text-blue-500 text-3xl">🛡️</div>
                    <p className="text-gray-700 text-base font-medium">
                      Prevención activa de delitos
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-blue-500 text-3xl">📱</div>
                    <p className="text-gray-700 text-base font-medium">
                      Respuesta inmediata a eventos
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-blue-500 text-3xl">💼</div>
                    <p className="text-gray-700 text-base font-medium">
                      Tranquilidad para tu negocio
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-blue-500 text-3xl">⚙️</div>
                    <p className="text-gray-700 text-base font-medium">
                      Protocolos normalizados
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                <img
                  src="/service/ss2.png"
                  alt="Centro de Monitoreo"
                  className="w-full h-auto object-contain max-h-96 rounded-xl"
                />
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 font-medium">
                    Centro de Monitoreo INFORCE
                  </p>
                  <p className="text-xs text-gray-500">
                    Tecnología de vanguardia 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
