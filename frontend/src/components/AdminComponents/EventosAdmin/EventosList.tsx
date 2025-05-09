import React, { useState, useEffect } from 'react';
import { Evento } from '../../../core/interfaces/Evento';
import styles from './EventosAdmin.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { getEventos, deleteEvento } from '../../../services/eventos.service';
import { useNavigate } from 'react-router-dom';

const EventosList: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const data = await getEventos();
        setEventos(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los eventos');
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      try {
        await deleteEvento(id);
        setEventos(eventos.filter(evento => evento.id_evento !== id));
      } catch (err) {
        setError('Error al eliminar el evento');
      }
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h2>Administrar Eventos</h2>
      <button 
        className={styles.addButton}
        onClick={() => navigate('/admin/eventos/nuevo')}
      >
        Añadir Nuevo Evento
      </button>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map(evento => (
            <tr key={evento.id_evento}>
              <td>{evento.nombre_evento}</td>
              <td>{new Date(evento.fecha_inicio).toLocaleDateString()}</td>
              <td>{new Date(evento.fecha_final).toLocaleDateString()}</td>
              <td>
                <button 
                  className={styles.editButton}
                  onClick={() => navigate(`/admin/eventos/editar/${evento.id_evento}`)}
                >
                  <FaEdit />
                </button>
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleDelete(evento.id_evento)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventosList;