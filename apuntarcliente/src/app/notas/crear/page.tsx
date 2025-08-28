'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from "react";
import { Container, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress, Snackbar } from '@mui/material';
import { getMateriasPorUsuario, createNota, checkTituloUnico } from '@/lib/nota';

interface Materia {
    id: number;
    nombre: string;
    nivel: string;
    nivelAcademico: string;
}

const USER_ID = 1;

export default function CrearNota() {
    const router = useRouter();

    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [prioridad, setPrioridad] = useState<'ALTA' | 'MEDIA' | 'BAJA'>('MEDIA');
    const [materiaID, setMateriaID] = useState<number | ''>('');
    const [materias, setMaterias] = useState<Materia[]>([]);

    const [tituloError, setTituloError] = useState('');
    const [tituloValidating, setTituloValidating] = useState(false);
    const [tituloUnico, setTituloUnico] = useState(true);
    
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {

        const fetchMaterias = async () => {
            try {
                const data = await getMateriasPorUsuario(USER_ID);
                setMaterias(data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar materias. Por favor, intente nuevamente.');
                setLoading(false);
            }
        };

        fetchMaterias();
    }, [router]);

    useEffect(() => {
        if (titulo.length < 3) {
            setTituloError('El título debe tener al menos 3 caracteres');
            setTituloUnico(true);
            return;
        }

        const timer = setTimeout(async () => {
        if (titulo.length >= 3) {
            setTituloValidating(true);
            try {
                const isUnique = await checkTituloUnico(titulo, USER_ID );
                setTituloUnico(isUnique);
            if (!isUnique) {
                setTituloError('El título ya existe para este usuario');
            } else {
                setTituloError('');
            }
            } catch (err) {
                setTituloError('Error al verificar el título');
            } finally {
                setTituloValidating(false);
            }
        }
        }, 500);

        return () => clearTimeout(timer);
    }, [titulo]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!titulo.trim()) {
            setTituloError('El título es obligatorio');
            return;
        }
        
        if (titulo.length < 3) {
            setTituloError('El título debe tener al menos 3 caracteres');
            return;
        }
        
        if (!tituloUnico) {
            setTituloError('El título ya existe para este usuario');
            return;
        }
        
        if (!materiaID) {
            setError('Debe seleccionar una materia');
            return;
        }
        
        if (!contenido.trim()) {
            setError('El contenido es obligatorio');
            return;
        }
        
        setSubmitting(true);
        setError('');
        
        try {
            await createNota({
                titulo,
                contenido,
                prioridad,
                materiaID: Number(materiaID),
                usuarioID: USER_ID
            });
            
            setSnackbarMessage('Nota creada exitosamente');
            setSnackbarOpen(true);
            
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (err: unknown) {
            if (err instanceof Error){
                setError(err.message);
            } else {
                setError('Error al crear la nota. Por favor, intente nuevamente.');
            }
            
        } finally {
            setSubmitting(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Crear Nueva Nota
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        label="Título"
                        value={titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)}
                        fullWidth
                        required
                        error={!!tituloError}
                        helperText={tituloError}
                        disabled={submitting}
                        InputProps={{
                        endAdornment: tituloValidating && (
                            <CircularProgress size={20} />
                        )
                        }}
                        sx={{ mb: 3, borderRadius: 1 }}
                    />
                    
                    <TextField
                        label="Contenido"
                        value={contenido}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setContenido(e.target.value)}
                        multiline
                        rows={6}
                        fullWidth
                        required
                        error={!!error && contenido.trim() === ''}
                        helperText={error && contenido.trim() === '' ? 'El contenido es obligatorio' : ''}
                        disabled={submitting}
                        sx={{ mb: 3, borderRadius: 1 }}
                    />
                    
                    <FormControl fullWidth required error={!!error && !materiaID} sx={{ mb: 3 }}>
                        <InputLabel>Materia</InputLabel>
                        <Select
                        value={materiaID}
                        label="Materia"
                        onChange={(e) => setMateriaID(e.target.value as number)}
                        disabled={submitting || materias.length === 0}
                        >
                        {materias.length === 0 ? (
                            <MenuItem value="" disabled>
                            No tienes materias registradas
                            </MenuItem>
                        ) : (
                            materias.map((materia) => (
                            <MenuItem key={materia.id} value={materia.id}>
                                {materia.nombre} ({materia.nivel} - {materia.nivelAcademico})
                            </MenuItem>
                            ))
                        )}
                        </Select>
                        {error && !materiaID && (
                        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                        )}
                    </FormControl>
                    
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>Prioridad</InputLabel>
                        <Select
                        value={prioridad}
                        label="Prioridad"
                        onChange={(e) => setPrioridad(e.target.value)}
                        disabled={submitting}
                        >
                            <MenuItem value="ALTA">
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box 
                                    sx={{ 
                                    width: 12, 
                                    height: 12, 
                                    borderRadius: '50%', 
                                    backgroundColor: 'error.main', 
                                    mr: 1 
                                    }} 
                                />
                                Alta
                                </Box>
                            </MenuItem>
                            <MenuItem value="MEDIA">
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box 
                                    sx={{ 
                                    width: 12, 
                                    height: 12, 
                                    borderRadius: '50%', 
                                    backgroundColor: 'warning.main', 
                                    mr: 1 
                                    }} 
                                />
                                Media
                                </Box>
                            </MenuItem>
                            <MenuItem value="BAJA">
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box 
                                    sx={{ 
                                    width: 12, 
                                    height: 12, 
                                    borderRadius: '50%', 
                                    backgroundColor: 'info.main', 
                                    mr: 1 
                                    }} 
                                />
                                Baja
                                </Box>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    
                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                        </Alert>
                    )}
                    
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={submitting || !tituloUnico || !materiaID || tituloValidating}
                        sx={{ 
                        py: 1.5, 
                        px: 4, 
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        width: '100%',
                        mb: 2
                        }}
                    >
                        {submitting ? (
                        <>
                            <CircularProgress size={24} sx={{ mr: 1 }} />
                            Creando...
                        </>
                        ) : 'Crear Nota'}
                    </Button>
                    
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => router.back()}
                        disabled={submitting}
                        sx={{ 
                        py: 1.5, 
                        px: 4, 
                        width: '100%'
                        }}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>
        
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                onClose={handleSnackbarClose} 
                severity="success" 
                sx={{ width: '100%' }}
                >
                {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}