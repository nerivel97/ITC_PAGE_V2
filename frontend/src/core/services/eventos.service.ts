// src/core/services/eventos.service.ts
import { IEvento, IEventoCreate, IEventoUpdate } from '../interfaces/evento.interface';
import { ApiResponse } from '../interfaces/api.interface';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const getEventos = async (): Promise<IEvento[]> => {
  try {
    const response = await axios.get(`${API_URL}/eventos`);
    
    // Verifica la estructura de la respuesta
    if (response.data?.success && Array.isArray(response.data.data)) {
      return response.data.data; // Extrae los eventos de response.data.data
    }
    
    throw new Error('Formato de respuesta inesperado');
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

export class EventosService {
  static async getAll(): Promise<ApiResponse<IEvento[]>> {
    try {
      const response = await axios.get(`${API_URL}/eventos`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener eventos');
    }
  }

  static async getById(id: number): Promise<ApiResponse<IEvento>> {
    try {
      const response = await axios.get(`${API_URL}/eventos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Evento no encontrado');
    }
  }

  static async create(evento: IEventoCreate): Promise<ApiResponse<IEvento>> {
    try {
      const response = await axios.post(`${API_URL}/eventos`, evento);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear evento');
    }
  }

  static async update(id: number, evento: IEventoUpdate): Promise<ApiResponse<IEvento>> {
    try {
      const response = await axios.put(`${API_URL}/eventos/${id}`, evento);
      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar evento');
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/eventos/${id}`);
    } catch (error) {
      throw new Error('Error al eliminar evento');
    }
  }
}