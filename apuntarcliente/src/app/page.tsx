'use client';

import { getNotas, Nota } from '@/lib/nota';
import { useEffect, useState } from "react";
import NoteCard from "@/componentes/NoteCard";
import { Box, Container, Grid, Typography, Button, CircularProgress } from "@mui/material";
import Link from "next/link";

export default function Home() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const data = await getNotas();
        setNotas(data);
      } catch (error){
        console.error('Error fetching notas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotas();
  }, []);

   if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        )
    }

  return (
    <Container maxWidth="lg" sx={{ mt: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Mis Notas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/materias/crear"
          sx={{ 
            fontWeight: 'bold',
            textTransform: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          + Crear Materia
        </Button>
      </Box>
      
      {notas.length > 0 ? (
        <Grid container spacing={3}>
          {notas.map((nota)=> (
            <Grid key={nota.id} component={Box} >
              <NoteCard
                id={nota.id}
                titulo={nota.titulo}
                contenido={nota.contenido}
                prioridad={nota.prioridad}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="h6" color="textSecondary">
                  No tienes notas creadas aún
              </Typography>
              <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  href="/notas/crear"
                  sx={{ mt: 2 }}
              >
                  Crear tu primera nota
              </Button>
          </Box>
      )}
    </Container>
  );
}
