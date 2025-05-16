import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Upload } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  phone: string;
  email: string;
  cv: FileList;
}

const Careers = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    console.log("Se disparó el submit");
    console.log("Datos recibidos:", data);

    setIsSubmitting(true);
    try {
      const file = data.cv[0];
      console.log("Archivo que voy a subir:", file);
      const fileExt = file.name.split('.').pop();
      const fileName = `cv_${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('cvs')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase
        .from('curriculums')
        .insert({
          name: data.name,
          phone: data.phone,
          email: data.email,
          cv_url: uploadData.path,
        });

      if (insertError) throw insertError;

      toast.success('¡Gracias por tu postulación!');
      reset();
    } catch (error) {
      toast.error('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-white py-12">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-primary text-center mb-6">Trabajá con Nosotros</h1>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-red-500 font-semibold mb-6 text-center">
              NO recibimos CV por redes sociales o email
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Nombre y Apellido *
                </label>
                <input
                  type="text"
                  {...register('name', { required: true })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">Este campo es requerido</span>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">Email inválido</span>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  {...register('phone', { required: true })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">Este campo es requerido</span>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  CV (PDF o DOC) *
                </label>
                <input
                  type="file"
                  {...register('cv', { required: true })}
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  disabled={isSubmitting}
                />
                {errors.cv && (
                  <span className="text-red-500 text-sm">El CV es requerido</span>
                )}
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
