import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Segmentos from '../components/Segmentos';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

type Slide = {
  image: string;
  buttonText: string;
  link: string;
  fit?: 'fill' | 'centerCrop'; // opcional
  scrollTo?: string; // nuevo campo
};


const mobileSlides: Slide[] = [
  {
    image: '/slides/slide1_mobile.jpg',
    buttonText: 'Más Información',
    fit: 'fill',
    link: '/services',
    scrollTo: 'serviciosinfo'
  },
  {
    image: '/slides/slide2_mobile.jpg',
    fit: 'fill',
    buttonText: 'Conocé Más',
    link: '/services',
    scrollTo: 'serviciosinfo'
  }
];

const desktopSlides: Slide[] = [
  {
    image: '/slides/slide1.png',
    buttonText: 'Más Información',
    link: '/services',
    scrollTo: 'serviciosinfo'
  },
  {
    image: '/slides/slide2.png',
    buttonText: 'Conocé Más',
    link: '/services',
    scrollTo: 'serviciosinfo'
  }
];



const Home = () => {
  const [current, setCurrent] = useState(0);

  const location = useLocation();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Llamada inicial

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    if (location.state?.scrollTo === 'empresa') {
      const section = document.getElementById('empresa');
      setTimeout(() => {
        section?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [location]);

  const slides = isMobile ? mobileSlides : desktopSlides;
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen"> 
      {/* Carousel de imagenes */}
      <div className={`relative w-full overflow-hidden ${isMobile ? 'h-[60vh] mt-[64px]' : 'h-[75vh] mt-[-64px]'}`}>
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
                className={`absolute inset-0 ${
                  isMobile
                    ? slide.fit === 'fill'
                      ? 'w-full h-full object-fill' // slide1_mobile
                      : 'h-full w-auto max-w-none left-1/2 -translate-x-1/2 object-cover' // slide2_mobile
                    : 'h-full w-full object-cover' // desktop (sin tocar)
                }`}
              />
            </div>
            <div className="absolute inset-0">
              <Link to={slide.link} state={slide.scrollTo ? { scrollTo: slide.scrollTo } : undefined}>
                <button
                  className={`absolute ${
                    isMobile
                      ? 'left-1/2 -translate-x-1/2 bottom-8 text-base px-6 py-3'
                      : 'left-[200px] bottom-[170px] text-sm px-4 py-2'
                  } bg-[#014fca] text-white rounded-full font-medium hover:bg-[#013f9e] transition`}
                >
                  {slide.buttonText}
                </button>
              </Link>
            </div>
          </div>
        ))}

        {/* Flechas */}
        {/* Flecha izquierda */}
        <button
          onClick={prevSlide}
          className={`absolute z-20 transform -translate-y-1/2 bg-black/40 text-white rounded-full hover:bg-black/60 transition ${
            isMobile ? 'top-1/2 left-2 p-3' : 'top-1/2 left-4 p-2'
          }`}
        >
          <ChevronLeft className={`${isMobile ? 'w-8 h-8' : 'w-6 h-6'}`} />
        </button>

        {/* Flecha derecha */}
        <button
          onClick={nextSlide}
          className={`absolute z-20 transform -translate-y-1/2 bg-black/40 text-white rounded-full hover:bg-black/60 transition ${
            isMobile ? 'top-1/2 right-2 p-3' : 'top-1/2 right-4 p-2'
          }`}
        >
          <ChevronRight className={`${isMobile ? 'w-8 h-8' : 'w-6 h-6'}`} />
        </button>


        {/* Indicadores */}
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

      {/* NUESTRA EMPRESA */}
      <section id="empresa" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-12">
            <h2 
                    className="bg-[#014fca] text-white py-2 text-xl font-bold uppercase mx-auto flex items-center justify-center"
                    style={{ width: "1600px" }} // Ajusta este valor manualmente
                >
                    NUESTRA EMPRESA
                </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
            <div className="w-full md:w-3/5 text-gray-700">
              <p className="mb-4">
                Brindamos servicios de excelencia con profesionales especializados en seguridad y vigilancia física, con la tecnología más avanzada aplicada a los servicios. Nacimos hace más de 25 años y forjamos un fuerte posicionamiento en el mercado de la seguridad.
              </p>
              <p>
                Somos una empresa, en la que la innovación, nuestro equipo humano y la orientación al cliente nos permiten mantener una alta calidad en nuestros servicios y la satisfacción del personal.
              </p>
            </div>
            <div className="w-full md:w-2/5">
              <video
                className="w-full h-auto rounded-lg shadow-lg"
                controls
                src="/video/background.mp4.mp4"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <img src="/mvv/mision.jpg" alt="Misión" className="mx-auto h-20 mb-4" />
              <h3 className="bg-[#014fca] text-white py-2 text-lg font-semibold uppercase">Misión</h3>
              <p className="mt-4 text-gray-700">
                Brindar servicios de seguridad privada con la más alta seriedad, honestidad y profesionalismo, priorizando la protección de nuestros clientes.
              </p>
            </div>
            <div>
              <img src="/mvv/vision.jpg" alt="Visión" className="mx-auto h-20 mb-4" />
              <h3 className="bg-[#014fca] text-white py-2 text-lg font-semibold uppercase">Visión</h3>
              <p className="mt-4 text-gray-700">
                Ser líderes y mantener la excelencia en el servicio de seguridad.
              </p>
            </div>
            <div>
              <img src="/mvv/valores.jpg" alt="Valores" className="mx-auto h-20 mb-4" />
              <h3 className="bg-[#014fca] text-white py-2 text-lg font-semibold uppercase">Valores</h3>
              <p className="mt-4 text-gray-700 text-center">
                 Profesionalismo<br />
                 Responsabilidad<br />
                 Respeto<br />
                 Innovación<br />
                 Confidencialidad
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <Segmentos />
      

    </div>
  );
};

export default Home;
