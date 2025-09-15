'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button, Alert, CircularProgress, Snackbar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createMateria } from '@/lib/materia';

interface Materia {
    id: number;
    nombre: string;
    nivel: string;
    nivelAcademico: string;
}

export default function CrearMateria() {
    const router = useRouter();
    
    const [nombre, setNombre] = useState('');
    const [nivel, setNivel] = useState('');
    const [nivelAcademico, setNivelAcademico] = useState('');
    
    const [nombreError, setNombreError] = useState('');
    const [nivelError, setNivelError] = useState('');
    const [nivelAcademicoError, setNivelAcademicoError] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const niveles = [1, 2, 3, 4, 5, 6];
    const nivelesAcademicos = ['Carrera', 'Curso', 'Maestria', 'Doctorado', 'Tecnicatura'];

    useEffect(() => {
        if (nombre.length > 0 && nombre.length < 3) {
            setNombreError('El nombre debe tener al menos 3 caracteres');
        } else {
            setNombreError('');
        }
    }, [nombre]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
    
        let hasError = false;
        
        if (!nombre.trim()) {
            setNombreError('El nombre es obligatorio');
            hasError = true;
        } else if (nombre.length < 3) {
            setNombreError('El nombre debe tener al menos 3 caracteres');
            hasError = true;
        }
        
        if (hasError) {
            return;
        }
        
        setSubmitting(true);
        setError('');
        
        try {
            await createMateria({
                nombre,
                nivel,
                nivelAcademico
            });
            
            setSnackbarMessage('Materia creada exitosamente');
            setSnackbarOpen(true);
            
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error al crear la materia. Por favor, intente nuevamente.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                    Crear Nueva Materia
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        fullWidth
                        required
                        error={!!nombreError}
                        helperText={nombreError}
                        disabled={submitting}
                        sx={{ mb: 3, borderRadius: 1 }}
                    />

                    <FormControl fullWidth required error={!!nivelError} sx={{ mb: 3 }}>
                        <InputLabel>Nivel</InputLabel>
                        <Select
                            value={nivel}
                            label="Nivel"
                            onChange={(e) => setNivel(e.target.value)}
                            disabled={submitting}
                        >
                            {niveles.map((nivelOption) => (
                                <MenuItem key={nivelOption} value={nivelOption.toString()}>
                                    {nivelOption}
                                </MenuItem>
                            ))}
                        </Select>
                        {nivelError && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                {nivelError}
                            </Typography>
                        )}
                    </FormControl>
                    
                    <FormControl fullWidth required error={!!nivelAcademicoError} sx={{ mb: 3 }}>
                        <InputLabel>Nivel Académico</InputLabel>
                        <Select
                            value={nivelAcademico}
                            label="Nivel Académico"
                            onChange={(e) => setNivelAcademico(e.target.value)}
                            disabled={submitting}
                        >
                            {nivelesAcademicos.map((nivelAcademicoOption) => (
                                <MenuItem key={nivelAcademicoOption} value={nivelAcademicoOption}>
                                    {nivelAcademicoOption}
                                </MenuItem>
                            ))}
                        </Select>
                        {nivelAcademicoError && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                {nivelAcademicoError}
                            </Typography>
                        )}
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
                        disabled={submitting || !!nombreError || !!nivelError || !!nivelAcademicoError}
                        sx={{ 
                            backgroundColor: '#234e68',
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
                        ) : 'Crear Materia'}
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
