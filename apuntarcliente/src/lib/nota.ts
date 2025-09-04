import { api } from './api';

export interface Nota {
    id: number;
    titulo: string;
    contenido: string;
    prioridad: string;
    fechaCreacion: string;
    materia?: {
        id: number;
        nombre?: string;
        nivel?: string;
        nivelAcademico?: string;
    };
}

export interface Materia {
    id: number;
    nombre: string;
    nivel: string;
    nivelAcademico: string;
}

interface AxiosErrorLike {
    response?: {
        status?: number;
    };
}

type UpdateNotaPayload = {
  titulo: string;
  contenido: string;
  prioridad: string;
  fechaCreacion: string;
  materia?: { id: number };
};

function isAxiosErrorLike(error: unknown): error is AxiosErrorLike {
    return typeof error === 'object' && error !== null && 'response' in error;
}

export const getNotas = async (): Promise<Nota[]> => {
    const response = await api.get<Nota[]>('/notas');
    return response.data;
};

export const createNota = async (nota: 
  {
    titulo: string;
    contenido: string;
    prioridad: string;
    materiaID: number;
  }): Promise<Nota> => {
    const response = await api.post<Nota>('/notas', {
        titulo: nota.titulo,
        contenido: nota.contenido,
        prioridad: nota.prioridad,
        fechaCreacion: new Date().toISOString().split("T")[0], 
        materia: { id: nota.materiaID } 
    });
    return response.data;
};

export const getNotaById = async (id: number): Promise<Nota> => {
    const response = await api.get<Nota>(`/notas/${id}`);
    return response.data;
};

export const checkTituloUnico = async (titulo: string, materiaID?: number, notaId?: number): Promise<boolean> => {
  try {
    const params: { titulo: string; materiaID?: number; notaId?: number } = { titulo };
    if (materiaID !== undefined && materiaID !== null) {
      params.materiaID = materiaID;
    }
    if (notaId !== undefined && notaId !== null) {
      params.notaId = notaId;
    }
    
    const response = await api.get(`/notas/check-titulo`, { params });
    return response.data === false;
  } catch (error: unknown) {
    console.error('Error checking title uniqueness:', error);
    if (isAxiosErrorLike(error) && error.response?.status === 422) {
      return false;
    }
    if (isAxiosErrorLike(error) && error.response?.status === 404) {
      return true;
    }
    throw new Error('Error al verificar el título. Por favor, intente nuevamente.');
  }
};

export const updateNota = async (
  id: number,
  nota: {
    titulo: string;
    contenido: string;
    prioridad: string;
    materiaID?: number;
    fechaCreacion: string;
  }
): Promise<Nota> => {
  try {
    const payload: UpdateNotaPayload = {
      titulo: nota.titulo,
      contenido: nota.contenido,
      prioridad: nota.prioridad,
      fechaCreacion: nota.fechaCreacion,
    };

    if (nota.materiaID) {
      payload.materia = { id: nota.materiaID };
    }

    const response = await api.put<Nota>(`/notas/${id}`, payload);
    return response.data;
  } catch (error: unknown) {
    console.error('Error actualizando la nota:', error);

    if (isAxiosErrorLike(error)) {
      if (error.response?.status === 404) {
        throw new Error('Nota no encontrada');
      }
      if (error.response?.status === 422) {
        throw new Error('El título ya existe para esta materia');
      }
      if (error.response?.status === 400) {
        throw new Error('Datos inválidos al actualizar la nota');
      }
    }

    throw new Error('Error al actualizar la nota. Por favor, intente nuevamente.');
  }
};

export const deleteNota = async (id: number): Promise<void> => {
  await api.delete(`/notas/${id}`);
};
