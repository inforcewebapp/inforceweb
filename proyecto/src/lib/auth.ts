import { supabase } from './supabase';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function resetPassword(email: string) {
  // Obtener la URL base actual
  const siteURL = window.location.origin;
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteURL}/update-password`,
  });
  return { data, error };
}

export async function updateUserPassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: password
  });
  return { data, error };
}

export async function isAdmin(email: string) {
  const { data, error } = await supabase
    .from('admins')
    .select('email')
    .eq('email', email)
    .maybeSingle();
  
  return { isAdmin: data !== null, error };
}

export async function logAdminAction(email: string, action: string) {
  const { error } = await supabase
    .from('logs_admin')
    .insert({
      email_admin: email,
      accion: action
    });
  
  return { error };
}