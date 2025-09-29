import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Dirección',
      content: 'Mariano Larra 3375, B° Urca, Córdoba, Argentina'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: '3516424117'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@inforce.com.ar'
    },
    {
      icon: Clock,
      title: 'Horarios',
      content: 'Lunes a Viernes: 9:00 - 18:00'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-24">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Contacto
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Estamos aquí para ayudarte con todas tus necesidades de seguridad
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start gap-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className="bg-[#014fca] text-white p-3 rounded-lg flex items-center justify-center">
                  <info.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{info.title}</h3>
                  <p className="text-gray-600 mt-1">{info.content}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Mapa */}
          <motion.div
  initial={{ opacity: 0, x: 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
>
  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
    <MapPin className="w-5 h-5 text-[#014fca]" />
    Nuestra Ubicación
  </h3>
  <p className="text-gray-600 mb-4">
    Visítanos en nuestras oficinas en Córdoba
  </p>
  <div className="overflow-hidden rounded-xl shadow-sm">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.2862371041437!2d-64.2436047!3d-31.3975583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432989d72cf6f15%3A0x4f6f6b8f6f6b8f6f!2sMariano%20Larra%203375%2C%20C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1620000000000!5m2!1ses!2sar"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      className="w-full h-[400px] md:h-[400px] lg:h-[360px]"
    ></iframe>
  </div>
</motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
