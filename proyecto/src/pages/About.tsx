import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users } from 'lucide-react';

const About = () => {
  const steps = [
    { icon: Target, title: 'Análisis', description: 'Evaluación detallada de necesidades' },
    { icon: Lightbulb, title: 'Estrategia', description: 'Planificación personalizada' },
    { icon: Users, title: 'Personal Capacitado', description: 'Equipo profesional especializado' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Quiénes Somos</h1>
          <p className="text-lg text-gray-700 mb-8">
            Somos una empresa líder en seguridad con más de una década de experiencia protegiendo lo que más importa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Misión</h2>
            <p className="text-gray-700">
              Brindar soluciones de seguridad integral que garanticen la tranquilidad y protección de nuestros clientes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Visión</h2>
            <p className="text-gray-700">
              Ser referentes en innovación y excelencia en servicios de seguridad a nivel nacional.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;