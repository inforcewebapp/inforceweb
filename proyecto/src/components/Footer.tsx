import React, { useState } from 'react';
import Careers from '../pages/Careers';
import CotizacionForm from '../pages/Quote';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Briefcase } from 'lucide-react';
import { Linkedin,  Facebook, Instagram } from 'lucide-react';
const Footer: React.FC = () => {
  const [showCareersModal, setShowCareersModal] = useState(false);

  return (
    <footer className="text-white">

      {/* CONTACTO */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-4 relative">
  <h2 
    className="heading text-3xl md:text-4xl font-extrabold text-gray-800 text-center bg-gradient-to-r from-[#014fca] to-[#0056d6] bg-clip-text text-transparent rounded-xl py-3 px-10 relative inline-block"
  >
    Inforce puede ayudarte
    {/* Línea decorativa debajo a la mitad */}
    <span className="absolute left-1/4 bottom-0 w-1/2 h-1 bg-blue-600 rounded-full"></span>
  </h2>
</div>

          
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 leading-relaxed">
              Complete el formulario y en breve nos contactaremos con usted
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <CotizacionForm />
          </div>
        </div>
      </section>

      {/* TRABAJÁ CON NOSOTROS - CALL TO ACTION */}
      <section className="bg-gradient-to-br from-[#014fca] to-[#0056d6] py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <Users className="w-16 h-16 text-white" />
            </div>
            
            <h2 className="heading text-4xl md:text-5xl font-extrabold text-white mb-6">
              ¡Únete a nuestro equipo!
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Forma parte de una empresa líder en seguridad con más de 25 años de experiencia.
              <br className="hidden md:block" />
              Buscamos profesionales comprometidos que quieran crecer con nosotros.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => setShowCareersModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#014fca] font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 text-lg"
              >
                <Briefcase className="w-6 h-6" />
                Postularme Ahora
              </motion.button>
              
              <div className="text-white/80 text-sm">
                📄 Envía tu CV y únete a nuestro equipo
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODAL DE CAREERS */}
      <AnimatePresence>
        {showCareersModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCareersModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="heading text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-[#014fca]" />
                    Trabaja con nosotros
                  </h3>
                  <p className="text-gray-600 mt-1">Completa el formulario y envía tu curriculum</p>
                </div>
                <button
                  onClick={() => setShowCareersModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              {/* Contenido del modal */}
              <div className="p-6">
                <Careers />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BLOQUE FINAL - DISEÑO NEUTRO ELEGANTE */}
      <div className="bg-gradient-to-br from-[#2a3446] via-[#2a3446] to-[#1e2936] py-16 mt-2">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

      {/* Logo y descripción */}
      <div className="lg:col-span-1 text-center lg:text-left">
        <div className="mb-6">
          <img 
            src="/logo.png" 
            alt="INFORCE SEGURIDAD" 
            className="h-[100px] w-auto mx-auto lg:mx-0 filter brightness-110" 
          />
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Más de 25 años protegiendo empresas, fábricas y complejos en Córdoba con tecnología avanzada y profesionales especializados.
        </p>
        <div className="text-xs text-gray-400">
          Copyright INFORCE © {new Date().getFullYear()}
          <br />
          Todos los derechos reservados
        </div>
      </div>

      {/* Contacto directo */}
      <div className="lg:col-span-1">
        <h4 className="heading text-white font-semibold text-lg mb-6">
          Contacto Directo
        </h4>
        
        <div className="space-y-4">
          <a 
            href="https://wa.me/5493513584999" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 text-white hover:opacity-80 transition"
          >
            <img src="/logos/wpplogo.png" alt="WhatsApp" className="h-[80px] w-[80px] flex-shrink-0" />
            <div>
              <p className="font-medium">¡Contáctanos por WhatsApp!</p>
              <p className="text-gray-400 text-sm">+54 9 3513 58-4999</p>
            </div>
          </a>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="lg:col-span-1">
  <h4 className="heading text-white font-semibold text-lg mb-6">
    Síguenos
  </h4>

  <div className="flex gap-6">
    <a
      href="https://www.instagram.com/inforce.seguridad?igsh=aG55OXFmNmp3Mzgx"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition"
    >
      <Instagram className="w-6 h-6  text-white" />
    </a>

    <a
      href="https://web.facebook.com/profile.php?id=61576923419057"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition"
    >
      <Facebook className="w-6 h-6  text-white" />
    </a>

    <a
      href="https://www.linkedin.com/in/inforce-seguridad-a28285384"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition"
    >
      <Linkedin className="w-6 h-6 text-white" />
    </a>
  </div>
</div>


    </div>

    {/* Línea divisoria y texto final */}
    <div className="mt-12 pt-8 border-t border-gray-800 text-center">
      <div className="text-gray-400 font-medium">
        🛡️ Tu seguridad es nuestra prioridad | Empresa líder en Córdoba desde 1998
      </div>
    </div>
  </div>

      </div>

    </footer>
  );
};

export default Footer;
