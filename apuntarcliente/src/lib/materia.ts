import { api } from './api';

export interface Materia {
    id: number;
    nombre: string;
    nivel: string;
    nivelAcademico: string;
}

export const getMaterias = async (): Promise<Materia[]> => {
    const response = await api.get('/materias');
    return response.data;
};

export const createMateria = async (materia: Omit<Materia, 'id'>): Promise<Materia> => {
    const response = await api.post<Materia>('/materias', materia);
    return response.data;
};

export const deleteMateria = async (id: number): Promise<void> => {
    await api.delete(`/materias/${id}`);
};