import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const CotizacionForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs.sendForm(
      '0',    // ← Reemplazá con el ID de tu servicio (ej: service_gmail)
      'template_kqs43hq',   // ← Reemplazá con el ID del template que creaste
      formRef.current,
      'KQnz8g33XZBRoK_aA'     // ← Reemplazá con tu public key (user ID)
    )
    .then(() => {
      alert('Solicitud enviada correctamente');
      formRef.current?.reset();
    })
    .catch((error) => {
      console.error('Error al enviar la solicitud:', error);
      alert('Hubo un problema. Intentá de nuevo.');
    });
  };

  return (
    <form ref={formRef} onSubmit={sendEmail} className="space-y-4 max-w-xl mx-auto">
      <input name="nombre" type="text" placeholder="Nombre y apellido" required className="w-full border p-2 text-gray-700" />
      <input name="gmail" type="email" placeholder="Correo electrónico" required className="w-full border p-2 text-gray-700" />
      <input name="telefono" type="tel" placeholder="Teléfono" required className="w-full border p-2 text-gray-700" />
      <textarea name="consulta" placeholder="Escriba su consulta aquí..." required className="w-full border p-2 h-32 text-gray-700" />
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
        Enviar solicitud
      </button>
    </form>
  );
};

export default CotizacionForm;
