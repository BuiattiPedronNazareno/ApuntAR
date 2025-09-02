'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Typography, Box, Button } from '@mui/material';
import { getNotaById } from '@/lib/nota';

export interface Nota {
    id: number;
    titulo: string;
    contenido: string;
    prioridad: string;
    fechaCreacion: Date;
    materiaID: number;
}

export default function NotaDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [nota, setNota] = useState<Nota | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNota = async () => {
        try {
            const data = await getNotaById(Number(id));
            setNota(data);
        } catch (error) {
            console.error('Error fetching note:', error);
        } finally {
            setLoading(false);
        }
        };
        fetchNota();
    }, [id]);

    if (loading) {
        return (
            <Container>
                <Typography variant="h6">Cargando...</Typography>
            </Container>
        );
    }

    if (!nota) {
        return (
            <Container>
                <Typography variant="h6">Nota no encontrada</Typography>
                <Button 
                variant="contained" 
                color="primary" 
                onClick={() => router.push('/')}
                sx={{ mt: 2 }}
                >
                    Volver al inicio
                </Button>
            </Container>
        );
    }

  return (
    <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                {nota.titulo}
            </Typography>
            <Typography variant="body1" paragraph>
                {nota.contenido}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                Fecha de creación: {nota.fechaCreacion.toLocaleDateString()} {/* ✅ Correcto - usa métodos de Date */}
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => router.back()}
                    sx={{ 
                        backgroundColor: '#234e68',
                    }}
                >
                    Volver
                </Button>
            </Box>  
        </Box>
    </Container>
  );
}