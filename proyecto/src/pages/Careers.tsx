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

// ⚠️ URL de la función serverless de Netlify para enviar email
// Utilizamos un path relativo para evitar problemas con diferentes entornos
const NETLIFY_FUNCTION_URL = "/.netlify/functions/sendMail";

// Detectamos si estamos en desarrollo local (http://localhost) o producción
// Usamos useEffect para acceder a window de forma segura
const isDevelopment = typeof window !== "undefined" && 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

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
      console.log('Iniciando proceso de envío...');
      
      // Validar honeypot (anti-spam)
      if (data.empresa && data.empresa.trim()) {
        toast.error('Envío inválido');
        return;
      }
      setIsSubmitting(true);
      
      // Mostrar indicador de carga
      toast.loading('Preparando tu solicitud...', { id: 'sending' });

      // Validar archivo adjunto
      const file = data.cv?.[0];
      if (!file) {
        toast.error('El CV es requerido', { id: 'sending' });
        setIsSubmitting(false);
        return;
      }

      // Validar extensión
      const ext = getExt(file.name);
      if (!ALLOWED_EXT.includes(ext)) {
        toast.error(`Formato no permitido. Solo: ${ALLOWED_EXT.join(', ')}`, { id: 'sending' });
        setIsSubmitting(false);
        return;
      }
      
      // Validar tamaño
      if (file.size > MAX_BYTES) {
        toast.error(`El archivo es muy grande (máx ${MAX_MB} MB)`, { id: 'sending' });
        setIsSubmitting(false);
        return;
      }

      // Crear FormData para enviar a la función serverless de Netlify
      const formData = new FormData();
      formData.append('nombre', data.name);
      formData.append('email', data.email);
      formData.append('telefono', data.phone ?? '');
      // Enviamos el archivo con AMBOS nombres para asegurar compatibilidad
      formData.append('file', file, file.name); // Para lambda-multipart-parser
      formData.append('cv', file, file.name);   // Por si el backend espera este nombre

      console.log('Enviando formulario a la función serverless de Netlify...');
      console.log('URL:', NETLIFY_FUNCTION_URL);
      
      // En desarrollo, mostramos más información para depurar
      if (isDevelopment) {
        console.log('MODO DESARROLLO: La función serverless no está disponible localmente, usando alternativa');
        toast.loading('Procesando tu solicitud...', { id: 'sending' });
        
        // SOLUCIÓN ALTERNATIVA PARA DESARROLLO LOCAL
        // Simular un pequeño retraso para dar feedback realista
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Enviar email usando nodemailer no es posible en el navegador
        // En su lugar, ofrecemos alternativas para desarrollo
        
        // Opción 1: Generar un mailto: link
        const subject = encodeURIComponent(`Nueva postulación de ${data.name}`);
        const body = encodeURIComponent(`Nombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone}\n\nNota: El CV debe ser enviado por separado desde el desarrollo local.`);
        window.open(`mailto:web@inforce-seguridad.com.ar?subject=${subject}&body=${body}`, '_blank');
        
        // Simular éxito
        console.log('MODO DESARROLLO: Se abrió el cliente de correo local');
        toast.success('En desarrollo: Se ha abierto tu cliente de correo. Para envíos reales, usa el entorno de producción.', { id: 'sending', duration: 8000 });
        
        // Resetear formulario
        reset();
        setFileName('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        setIsSubmitting(false);
        return; // Salir de la función, no continuar con el envío real
      } else {
        toast.loading('Enviando solicitud...', { id: 'sending' });
      }
      
      console.log('Datos:', {
        nombre: data.name,
        email: data.email,
        telefono: data.phone,
        archivo: file.name,
        tamaño: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        tipo: file.type
      });
      
      try {
        // En producción: Enviar a la función serverless
        console.log('MODO PRODUCCIÓN: Enviando datos a la función serverless...');
        const response = await fetch(NETLIFY_FUNCTION_URL, { 
          method: 'POST', 
          body: formData 
        });
        
        console.log('Respuesta HTTP:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries([...response.headers.entries()])
        });
        
        // Obtener el texto completo de la respuesta para diagnóstico
        const responseText = await response.text();
        console.log('Respuesta (texto):', responseText);
        
        // Intentar parsear como JSON si es posible
        let result;
        try {
          result = JSON.parse(responseText);
          console.log('Respuesta (JSON):', result);
        } catch (parseError) {
          console.error('Error al parsear JSON:', parseError);
          result = {};
        }
        
        if (!response.ok || !result.ok) {
          throw new Error(result?.error || `Error al enviar (${response.status}): ${responseText || response.statusText}`);
        }
      } catch (fetchError) {
        console.error('Error en fetch:', fetchError);
        throw fetchError;
      }

      // Éxito
      console.log('Formulario enviado con éxito');
      toast.success('¡Gracias por tu postulación! Te contactaremos pronto.', { id: 'sending', duration: 5000 });
      
      // Resetear el formulario
      reset();
      setFileName('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      
    } catch (error: any) {
      console.error('Error al enviar formulario:', error);
      
      // Mensajes de error específicos según el tipo de error
      if (error.message?.includes('CORS')) {
        toast.error('Error de conexión al servidor. Por favor, intenta más tarde.', { id: 'sending', duration: 5000 });
      } else if (error.message?.includes('NetworkError')) {
        toast.error('Problema de red. Verifica tu conexión a internet.', { id: 'sending', duration: 5000 });
      } else if (error.message?.includes('timeout')) {
        toast.error('La conexión tomó demasiado tiempo. Intenta nuevamente.', { id: 'sending', duration: 5000 });
      } else {
        toast.error(
          `${error?.message || 'Hubo un error al enviar tu CV'}. Por favor, intenta nuevamente o contáctanos directamente.`, 
          { id: 'sending', duration: 5000 }
        );
      }
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
                  disabled={isSubmitting}
                />
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
              
              <div className="mt-4">
                <p className="text-xs text-gray-500 mt-2">
                  Al enviar este formulario, aceptas que tus datos sean procesados para participar en nuestros procesos de selección.
                  Tu CV será procesado únicamente a través de esta vía oficial.
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
