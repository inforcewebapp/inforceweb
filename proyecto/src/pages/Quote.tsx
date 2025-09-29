import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Building, Briefcase, Mail, Phone, MessageSquare } from 'lucide-react';

const CotizacionForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const nombre = formData.get('nombre');
    const empresa = formData.get('empresa');
    const cargo = formData.get('cargo');
    const gmail = formData.get('gmail');
    const telefono = formData.get('telefono');
    const consulta = formData.get('consulta');

    const mensaje = `Nueva consulta desde la web

Nombre: ${nombre}
Empresa: ${empresa}
Cargo: ${cargo}
Email: ${gmail}
Teléfono: ${telefono}
Consulta: ${consulta}`;

    const whatsappUrl = `https://wa.me/5493513584999?text=${encodeURIComponent(mensaje)}`;
    
    window.open(whatsappUrl, '_blank');
    
    alert('Redirigiendo a WhatsApp para enviar tu consulta');
    formRef.current?.reset();
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
      <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
        {/* Nombre y Apellido */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-[#014fca]" />
            Nombre y Apellido
          </label>
          <input
            name="nombre"
            type="text"
            placeholder="Ingresa tu nombre completo"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#014fca] focus:ring-4 focus:ring-[#014fca]/10 transition-all duration-300 text-gray-700 placeholder-gray-400 hover:border-gray-300"
          />
        </div>

        {/* Nombre de empresa/complejo */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Building className="w-4 h-4 text-[#014fca]" />
            Nombre de tu empresa / complejo
          </label>
          <input
            name="empresa"
            type="text"
            placeholder="Nombre de la empresa o complejo"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#014fca] focus:ring-4 focus:ring-[#014fca]/10 transition-all duration-300 text-gray-700 placeholder-gray-400 hover:border-gray-300"
          />
        </div>

        {/* Rol/Cargo */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#014fca]" />
            Rol/Cargo que ocupas
          </label>
          <input
            name="cargo"
            type="text"
            placeholder="Tu cargo o posición en la empresa"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#014fca] focus:ring-4 focus:ring-[#014fca]/10 transition-all duration-300 text-gray-700 placeholder-gray-400 hover:border-gray-300"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#014fca]" />
            Email
          </label>
          <input
            name="gmail"
            type="email"
            placeholder="tu@email.com"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#014fca] focus:ring-4 focus:ring-[#014fca]/10 transition-all duration-300 text-gray-700 placeholder-gray-400 hover:border-gray-300"
          />
        </div>

        {/* Celular */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#014fca]" />
            Celular
          </label>
          <input
            name="telefono"
            type="tel"
            placeholder="+54 9 351 123-4567"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#014fca] focus:ring-4 focus:ring-[#014fca]/10 transition-all duration-300 text-gray-700 placeholder-gray-400 hover:border-gray-300"
          />
        </div>

        {/* Problema a solucionar */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#014fca]" />
            ¿Qué problema sufren actualmente que te gustaría solucionar?
          </label>
          <textarea
            name="consulta"
            placeholder="Describe el problema de seguridad que necesitas resolver, horarios de cobertura, tipo de instalaciones, etc."
            required
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#014fca] focus:ring-4 focus:ring-[#014fca]/10 transition-all duration-300 text-gray-700 placeholder-gray-400 hover:border-gray-300 resize-none"
          />
        </div>

        {/* Botón de envío */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#014fca] to-[#0056d6] text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-[#0056d6] hover:to-[#014fca] flex items-center justify-center gap-3 text-lg"
        >
          <Send className="w-5 h-5" />
          Enviar Solicitud
        </motion.button>
      </form>

      {/* Información adicional */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-center text-sm text-gray-600">
          <p className="mb-2">📞 <strong>Respuesta rápida:</strong> Te contactaremos en menos de 24 horas</p>
          <p>🔒 <strong>Información segura:</strong> Tus datos están protegidos</p>
        </div>
      </div>
    </div>
  );
};

export default CotizacionForm;
