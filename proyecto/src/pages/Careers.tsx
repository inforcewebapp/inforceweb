import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

interface FormInputs {
  name: string;
  phone: string;
  email: string;
  cv: FileList;
  empresa?: string; // honeypot
}

const MAX_MB = 10;
const MAX_BYTES = MAX_MB * 1024 * 1024;
const ALLOWED_EXT = ['pdf', 'doc', 'docx'];

function getExt(filename: string) {
  const i = filename.lastIndexOf('.');
  return i >= 0 ? filename.slice(i + 1).toLowerCase() : '';
}

const Careers: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormInputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>('');

  // Escucha el campo 'cv' (para ver si cambia)
  const cvWatch = watch('cv');

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // Actualiza el valor de RHF explícitamente (evita reseteos raros)
      setValue('cv', e.target.files as FileList, { shouldValidate: true });
      console.log('Archivo elegido:', file.name, file.size, file.type);
    } else {
      setFileName('');
    }
  };

  const onSubmit = async (data: FormInputs) => {
    try {
      if (data.empresa && data.empresa.trim()) {
        toast.error('Envío inválido');
        return;
      }
      setIsSubmitting(true);

      const file = data.cv?.[0];
      if (!file) {
        toast.error('El CV es requerido');
        return;
      }

      const ext = getExt(file.name);
      if (!ALLOWED_EXT.includes(ext)) {
        toast.error(`Formato no permitido. Solo: ${ALLOWED_EXT.join(', ')}`);
        return;
      }
      if (file.size > MAX_BYTES) {
        toast.error(`El archivo es muy grande (máx ${MAX_MB} MB)`);
        return;
      }

      const fd = new FormData();
      fd.append('nombre', data.name);
      fd.append('email', data.email);
      fd.append('telefono', data.phone ?? '');
      fd.append('cv', file, file.name);

      // ahora pega al endpoint de Netlify Function
      const resp = await fetch("/.netlify/functions/sendMail", {
        method: "POST",
        body: fd
      });

      const json = await resp.json().catch(() => ({}));
      if (!resp.ok || !json?.ok) throw new Error(json?.error || 'Error al enviar. Intenta de nuevo.');

      toast.success('¡Gracias por tu postulación!');
      reset();
      setFileName('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error?.message || 'Hubo un error al enviar el formulario.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b bg-white py-12">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-primary text-center mb-6">Trabajá con Nosotros</h1>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-red-500 font-semibold mb-6 text-center">
              NO recibimos CV por redes sociales o email
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
              {/* Honeypot oculto */}
              <input
                type="text"
                {...register('empresa')}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <label className="block text-gray-700 font-medium mb-2">Nombre y Apellido *</label>
                <input
                  type="text"
                  {...register('name', { required: true })}
                  className="text-gray-700 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  disabled={isSubmitting}
                />
                {errors.name && <span className="text-red-500 text-sm">Este campo es requerido</span>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email *</label>
                <input
                  type="email"
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  className="text-gray-700 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  disabled={isSubmitting}
                />
                {errors.email && <span className="text-red-500 text-sm">Email inválido</span>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Teléfono *</label>
                <input
                  type="tel"
                  {...register('phone', { required: true })}
                  className="text-gray-700 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  disabled={isSubmitting}                />
                {errors.phone && <span className="text-red-500 text-sm">Este campo es requerido</span>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">CV (PDF o DOC) *</label>

                {/* Input oculto + botón para abrir el selector */}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  {...register('cv', { required: true })}
                  className="hidden"
                  ref={fileInputRef}
                  onChange={onFileChange}
                />

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePickFile}
                    className="px-4 py-2 rounded-lg border text-[#2a3446]"
                    disabled={isSubmitting}
                  >
                    Elegir archivo
                  </button>
                  <span className="text-sm text-[#2a3446]">
                    {fileName || (cvWatch?.length ? cvWatch[0]?.name : 'Ningún archivo seleccionado')}
                  </span>
                </div>

                {errors.cv && <span className="text-red-500 text-sm">El CV es requerido</span>}
                <p className="text-xs text-gray-500 mt-1">
                  Formatos permitidos: PDF, DOC, DOCX. Tamaño máx: {MAX_MB} MB.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;
