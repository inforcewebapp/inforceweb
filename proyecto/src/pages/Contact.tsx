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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Contacto</h1>
          <p className="text-lg text-gray-700">Estamos aquí para ayudarte</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">{info.title}</h3>
                  <p className="text-gray-600">{info.content}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.2862371041437!2d-64.2436047!3d-31.3975583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432989d72cf6f15%3A0x4f6f6b8f6f6b8f6f!2sMariano%20Larra%203375%2C%20C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1620000000000!5m2!1ses!2sar"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;