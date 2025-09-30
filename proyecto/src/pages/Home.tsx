import React, { useState } from "react";
import { Link } from "react-router-dom";
import Segmentos from "../components/Segmentos";
import ClientsSlider from "../components/ClientsSlider";
import MissionVisionValues from "../components/MissionVisionValues";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

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
const Home = () => {
  const [current, setCurrent] = useState(0);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo === "empresa") {
      const section = document.getElementById("empresa");
      setTimeout(() => {
        section?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [location]);

  const slides = isMobile ? mobileSlides : desktopSlides;
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen">
  <div
  className={`relative w-full overflow-hidden ${
    isMobile ? "mt-[75px]" : "mt-[50px]"
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
            className="w-full h-full object-cover object-center md:object-[center_top] transition-all duration-1000"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent md:from-black/60 md:via-black/25 md:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:from-black/70 md:via-transparent md:to-black/30"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"></div>

        {/* Botón de asesor - Oculto en banner 1 y 4 */}
        {slide.image !== "/monitoreo.png" && slide.image !== "/monitoreo.png" && (
          <div className="absolute right-4 md:right-8 lg:right-12 bottom-4 md:bottom-6 lg:bottom-8 z-20">
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
</div>

      {/* Sección de Videos */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <div className="aspect-[9/16] relative">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="/video/v.mp4"
                  >
                    <source src="/videos/video1.mp4" type="video/mp4" />
                    Tu navegador no soporta videos HTML5.
                  </video>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Video 2 */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <div className="aspect-[9/16] relative">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="/video/video1.mp4"
                  >
                    <source src="/videos/video2.mp4" type="video/mp4" />
                    Tu navegador no soporta videos HTML5.
                  </video>
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                  {/* Texto superpuesto como en la imagen */}
                </div>
              </div>
            </div>

            {/* Video 3 */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <div className="aspect-[9/16] relative">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="/video/videoo.mp4"
                  >
                    <source src="/videos/video3.mp4" type="video/mp4" />
                    Tu navegador no soporta videos HTML5.
                  </video>
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                  {/* Texto superpuesto como en la imagen */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="empresa" className="py-18 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-8 relative">
            <h2 className="heading text-3xl md:text-4xl font-extrabold text-gray-800 text-center bg-gradient-to-r from-[#014fca] to-[#0056d6] bg-clip-text text-transparent rounded-xl py-3 px-10 relative inline-block">
              Qué es Inforce
              {/* Línea decorativa debajo a la mitad */}
              <span className="absolute left-1/4 bottom-0 w-1/2 h-1 bg-blue-600 rounded-full"></span>
            </h2>
          </div>

          <div className="bg-gray-100  p-8 mb-16 duration-300">
            <div className="flex flex-col md:flex-row items-start justify-center gap-8 mb-12">
              <div className="w-full md:w-3/5 text-gray-700 space-y-6">
                <p className="text-lg leading-relaxed">
                  Ofrecemos servicios de seguridad de excelencia, respaldados
                  por un equipo de profesionales altamente especializados y la
                  tecnología más avanzada en monitoreo y prevención.
                </p>
                <p className="text-lg leading-relaxed">
                  Con más de 25 años de experiencia, hemos construido un sólido
                  posicionamiento en seguridad en Córdoba, protegiendo empresas,
                  fábricas, organismos públicos y complejos de edificios.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#014fca]">
                    Nuestros pilares fundamentales:
                  </h3>

                  <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-[#014fca] hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">👮‍♂️</span>
                      <div>
                        <h4 className="font-bold text-lg text-gray-800 mb-1">
                          Guardia física profesional
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Cobertura completa en cada metro cuadrado de las
                          instalaciones de nuestros clientes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-[#014fca] hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">📡</span>
                      <div>
                        <h4 className="font-bold text-lg text-gray-800 mb-1">
                          Monitoreo remoto 24/7
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Operado desde nuestro búnker de seguridad, con equipos
                          capacitados y sistemas potenciados por IA en tiempo
                          real.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-2/6">
                <div className="bg-white p-2 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="relative overflow-hidden rounded-xl">
                    <video
                      className="w-full object-cover rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
                      style={{ height: "550px" }}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      src="/video/verticalvideo.mp4"
                    >
                      <source src="/video/verti.mp4" type="video/mp4" />
                      Tu navegador no soporta videos HTML5.
                    </video>
                    {/* Overlay sutil para mejor integración visual */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-10 relative">
            <h2 className="heading text-3xl md:text-4xl font-extrabold text-gray-800 text-center bg-gradient-to-r from-[#014fca] to-[#0056d6] bg-clip-text text-transparent rounded-xl py-3 px-10 relative inline-block">
              Sobre Inforce
              {/* Línea decorativa debajo a la mitad */}
              <span className="absolute left-1/4 bottom-0 w-1/2 h-1 bg-blue-600 rounded-full"></span>
            </h2>
          </div>

          <MissionVisionValues />
        </div>
      </section>

      {/* Clientes */}
      <ClientsSlider />

      {/* Servicios */}
      <Segmentos />
    </div>
  );
};

export default Home;
