import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      // Primero intentamos iniciar sesión
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (signInError) {
        toast.error('Credenciales incorrectas');
        setIsLoading(false);
        return;
      }

      const userEmail = signInData.user?.email;
      console.log("Email detectado al loguearse:", userEmail);

      // Ahora chequeamos si es admin
      const { data: adminMatch, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', userEmail)
        .maybeSingle();

      console.log("Resultado de búsqueda en admins:", adminMatch);

      if (adminError) {
        console.error("Error en consulta a admins:", adminError);
        toast.error('Error al verificar permisos');
        setIsLoading(false);
        return;
      }

      if (!adminMatch) {
        await supabase.auth.signOut();
        toast.error('No tienes permisos de administrador');
        setIsLoading(false);
        return;
      }

      // Si todo es correcto, redirigimos al panel
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });

    } catch (error: any) {
      toast.error('Error al iniciar sesión');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error('Ingresa tu email para resetear la contraseña');
      return;
    }

    setIsResetting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase());
      if (error) throw error;
      toast.success('Se ha enviado un email para resetear tu contraseña');
    } catch (error) {
      toast.error('Error al enviar el email de reseteo');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Panel de Administración</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>

              <button
                type="button"
                onClick={handleResetPassword}
                className="w-full text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                disabled={isResetting}
              >
                {isResetting ? 'Enviando...' : '¿Olvidaste tu contraseña?'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
