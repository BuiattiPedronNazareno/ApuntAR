'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {  Container, Typography, Box, Button, Card, CardContent, CircularProgress, IconButton } from '@mui/material';
import { getNotaById, deleteNota, getNotas, Nota } from '@/lib/nota';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NotaRenderer from "@/componentes/NotaRenderer";

export default function NotaDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [nota, setNota] = useState<Nota | null>(null);
    const [loading, setLoading] = useState(true);
    const [todasLasNotas, setTodasLasNotas] = useState<{ id: number; titulo: string }[]>([]);

    useEffect(() => {
        const fetchNota = async () => {
        try {
          const data = await getNotaById(Number(id));
          setNota(data);
          const allNotas = await getNotas(); 
          setTodasLasNotas(allNotas);
        } catch (error) {
            console.error('Error fetching note:', error);
        } finally {
            setLoading(false);
        }
        };
        fetchNota();
    }, [id]);


    const handleDelete = async () => {
      if (!id) return;
      const confirmDelete = window.confirm("¿Seguro que quieres eliminar esta nota?");
      if (!confirmDelete) return;

      try {
        await deleteNota(Number(id));
        router.push('/notas'); // Redirige a la lista después de borrar
      } catch (error) {
        console.error("Error al eliminar la nota:", error);
        alert("Hubo un error al eliminar la nota.");
      }
    };

    if (loading) {
        return (
            <Container>
                <CircularProgress />
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
    <Container maxWidth="xl" sx={{ mt: 0, p: 0 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push('/')}
          sx={{ fontWeight: 'bold' }}
        >
          Volver
        </Button>

        <Box>
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => router.push(`/notas/${id}/editar/`)}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          height: 'calc(100vh - 100px)',
          px: 2,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            flex: 1,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <CardContent
            sx={{
              flex: 1,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              '&:last-child': { pb: 2 },
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ mb: 2 }}
            >
              {nota.titulo}
            </Typography>

            <Box
              sx={{
                flex: 1,
                overflowY: 'auto', 
                pr: 1,            
              }}
            >
              <NotaRenderer contenido={nota.contenido} notas={todasLasNotas} />
            </Box>

            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              Fecha de creación: {new Date(nota.fechaCreacion).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );

}