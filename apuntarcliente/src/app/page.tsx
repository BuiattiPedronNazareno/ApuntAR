'use client';

import { getNotas, Nota } from '@/lib/nota';
import { useEffect, useState } from "react";
import NoteCard from "@/componentes/NoteCard";
import { Box, Container, Grid, Typography } from "@mui/material";

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
      <Container>
        <Typography variant="h6">Cargando notas...</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Mis Notas
      </Typography>
      <Grid container spacing={3}>
        {notas.map((nota)=> (
          <Grid key={nota.id} component={Box}>
            <NoteCard
              id={nota.id}
              titulo={nota.titulo}
              contenido={nota.contenido}
              prioridad={nota.prioridad}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
