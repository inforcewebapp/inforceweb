// adminActions.ts

import { supabase } from '../lib/supabase';
import { logAdminAction } from '../lib/auth';
import toast from 'react-hot-toast';

export const fetchData = async (showReviewed: boolean) => {
  try {
    const [curriculumsResponse, consultasResponse] = await Promise.all([
      supabase.from('curriculums').select('*').eq('revisado', showReviewed).order('created_at', { ascending: false }),
      supabase.from('consultas').select('*').eq('revisado', showReviewed).order('created_at', { ascending: false }),
    ]);

    if (curriculumsResponse.error || consultasResponse.error) {
      throw curriculumsResponse.error || consultasResponse.error;
    }

    return {
      curriculums: curriculumsResponse.data || [],
      consultas: consultasResponse.data || [],
    };
  } catch (error) {
    console.error('Error al cargar datos:', error);
    toast.error('Error al cargar datos');
    return { curriculums: [], consultas: [] };
  }
};

export const handleMarkReviewed = async (id: string, table: string, userEmail: string, fetchData: () => void) => {
  try {
    const { error } = await supabase
      .from(table)
      .update({ revisado: true, fecha_revisado: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;

    await logAdminAction(userEmail, `Marcó como revisado un registro en ${table}`);
    toast.success('Registro marcado como revisado');
    fetchData();
  } catch (error) {
    console.error('Error al marcar revisado:', error);
    toast.error('Error al actualizar el registro');
  }
};

export const handleDelete = async (id: string, table: string, userEmail: string, fetchData: () => void) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este registro?')) return;

  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw error;

    await logAdminAction(userEmail, `Eliminó un registro en ${table}`);
    toast.success('Registro eliminado correctamente');
    fetchData();
  } catch (error) {
    console.error('Error al eliminar registro:', error);
    toast.error('Error al eliminar el registro');
  }
};

export const handleSave = async (editing: any, table: string, fetchData: () => void, setEditing: any, userEmail: string) => {
  if (!editing) return;

  try {
    const { error } = await supabase
      .from(table)
      .update({ [editing.field]: editing.value })
      .eq('id', editing.id);

    if (error) throw error;

    await logAdminAction(userEmail, `Editó el campo ${editing.field} en ${table}`);
    toast.success('Campo actualizado correctamente');
    setEditing(null);
    fetchData();
  } catch (error) {
    console.error('Error al actualizar el campo:', error);
    toast.error('Error al actualizar el campo');
  }
};

export const downloadCV = async (path: string, name: string) => {
  try {
    const response = await fetch(`https://hxfzpschzxdxcvsehkxc.supabase.co/storage/v1/object/public/cvs/${path}`);
    const blob = await response.blob();
    const ext = path.split('.').pop()?.split('?')[0] || 'pdf';
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `curriculum_${name}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error al descargar el archivo:', error);
    toast.error('Error al descargar el archivo');
  }
};
