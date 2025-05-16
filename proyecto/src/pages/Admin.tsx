// Admin.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Download, CheckCircle, AlertTriangle, Trash2, Eye, EyeOff, Edit2, Save, X } from "lucide-react";
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import toast, { Toaster } from 'react-hot-toast';
import { fetchData, handleMarkReviewed, handleDelete, downloadCV } from "./adminActions";

interface Record {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  cv_url?: string;
  created_at: string;
  revisado: boolean;
  fecha_revisado: string | null;
}

interface EditingRecord {
  id: string;
  field: string;
  value: string;
}

const Admin = () => {
  const { user } = useAuth();
  const [curriculums, setCurriculums] = useState<Record[]>([]);
  const [consultas, setConsultas] = useState<Record[]>([]);
  const [showReviewed, setShowReviewed] = useState(false);
  const [activeTab, setActiveTab] = useState<'curriculums' | 'consultas'>('curriculums');
  const [isLoading, setIsLoading] = useState(true);
  interface EditingRow {
    id: string;
    data: Partial<Record>;
  }
  const [editingRow, setEditingRow] = useState<EditingRow | null>(null);


    useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const { curriculums, consultas } = await fetchData(showReviewed);
      setCurriculums(curriculums);
      setConsultas(consultas);
      setIsLoading(false);
    };
    load();
  }, [showReviewed]);

  const isNearDeletion = (record: Record) => {
    if (!record.fecha_revisado) return false;
    const daysAfterReview = differenceInDays(new Date(), new Date(record.fecha_revisado));
    return daysAfterReview >= 10;
  };

  const saveEdit = async () => {
    if (!editingRow) return;
    const { id, data } = editingRow;
    const table = activeTab;
    
    try {
      const { error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success('Registro actualizado correctamente');
      await fetchData(setCurriculums, setConsultas, setIsLoading, showReviewed);
      setEditingRow(null);
    } catch (error) {
      toast.error('Error al guardar cambios');
      console.error('Error:', error);
    }
  };


  const renderTable = (records: Record[], table: 'curriculums' | 'consultas') => {
    if (isLoading) return <div className="text-center py-8">Cargando...</div>;

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Email</th>
              <th className="p-2">Teléfono</th>
              {table === 'consultas' && <th className="p-2">Mensaje</th>}
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
  <tr key={record.id} className={`${isNearDeletion(record) ? 'bg-red-50' : ''} hover:bg-gray-100`}>
    <td className="p-2">
      {editingRow?.id === record.id ? (
        <input
          type="text"
          value={editingRow.data.name || ''}
          onChange={(e) =>
            setEditingRow({
              ...editingRow,
              data: { ...editingRow.data, name: e.target.value }
            })
          }
          className="border p-1 w-full"
        />
      ) : (
        record.name
      )}
    </td>

    <td className="p-2">
      {editingRow?.id === record.id ? (
        <input
          type="email"
          value={editingRow.data.email || ''}
          onChange={(e) =>
            setEditingRow({
              ...editingRow,
              data: { ...editingRow.data, email: e.target.value }
            })
          }
          className="border p-1 w-full"
        />
      ) : (
        record.email
      )}
    </td>

    <td className="p-2">
      {editingRow?.id === record.id ? (
        <input
          type="text"
          value={editingRow.data.phone || ''}
          onChange={(e) =>
            setEditingRow({
              ...editingRow,
              data: { ...editingRow.data, phone: e.target.value }
            })
          }
          className="border p-1 w-full"
        />
      ) : (
        record.phone
      )}
    </td>

    {table === 'consultas' && (
      <td className="p-2">
        {editingRow?.id === record.id ? (
          <input
            type="text"
            value={editingRow.data.message || ''}
            onChange={(e) =>
              setEditingRow({
                ...editingRow,
                data: { ...editingRow.data, message: e.target.value }
              })
            }
            className="border p-1 w-full"
          />
        ) : (
          record.message
        )}
      </td>
    )}

    <td className="p-2 flex gap-2 items-center">
      {!record.revisado && (
        <CheckCircle
          className="text-green-600 cursor-pointer"
          onClick={async () => {
            await handleMarkReviewed(record.id, table, user?.email || '', 
              async () => await fetchData(setCurriculums, setConsultas, setIsLoading, showReviewed)
            );
          }}
        />

      )}

      {table === 'curriculums' && record.cv_url && (
        <Download
          className="text-blue-600 cursor-pointer"
          onClick={() => downloadCV(record.cv_url!, record.name)}
        />
      )}

      {editingRow?.id === record.id ? (
        <>
          <button
            onClick={() => saveEdit(record.id, table)}
            className="text-green-600 hover:text-green-800"
          >
            <Save className="w-5 h-5" />
          </button>
          <button
            onClick={() => setEditingRow(null)}
            className="text-gray-600 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </>
      ) : (
        <Edit2
          className="text-yellow-500 cursor-pointer"
          onClick={() => setEditingRow({ id: record.id, data: { ...record } })}
          title="Editar"
        />
      )}

      <Trash2
        className="text-red-600 cursor-pointer"
        onClick={async () => {
          await handleDelete(record.id, table, user?.email || '', () => fetchData(setCurriculums, setConsultas, setIsLoading, showReviewed));
        }}
      />

      {isNearDeletion(record) && <AlertTriangle className="text-yellow-400" />}
    </td>
  </tr>
))}

          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Panel de Administración</h1>
            <button onClick={() => setShowReviewed(!showReviewed)} className="flex items-center gap-2 border p-2 rounded">
              {showReviewed ? <><EyeOff /> Mostrar Pendientes</> : <><Eye /> Mostrar Revisados</>}
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <button onClick={() => setActiveTab('curriculums')} className={`px-4 py-2 rounded ${activeTab === 'curriculums' ? 'bg-primary text-white' : 'bg-gray-200'}`}>Currículums</button>
            <button onClick={() => setActiveTab('consultas')} className={`px-4 py-2 rounded ${activeTab === 'consultas' ? 'bg-primary text-white' : 'bg-gray-200'}`}>Consultas</button>
          </div>

          {activeTab === 'curriculums'
            ? renderTable(curriculums, 'curriculums')
            : renderTable(consultas, 'consultas')}
        </div>
      </div>
    </div>
  );
};

export default Admin;
