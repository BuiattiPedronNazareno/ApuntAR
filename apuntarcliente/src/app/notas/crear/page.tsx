'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from "react";
import { Container, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress, Snackbar, Card, CardContent, FormHelperText } from '@mui/material';
import { createNota, checkTituloUnico } from '@/lib/nota';
import { getMaterias } from '@/lib/materia';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Materia } from '@/lib/materia';

export default function CrearNota() {
    const router = useRouter();

    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [prioridad, setPrioridad] = useState<'ALTA' | 'MEDIA' | 'BAJA'>('MEDIA');
    const [materiaID, setMateriaID] = useState<number | ''>('');
    const [materias, setMaterias] = useState<Materia[]>([]);

    const [tituloError, setTituloError] = useState('');
    const [contenidoError, setContenidoError] = useState('');
    const [materiaError, setMateriaError] = useState('');
    const [tituloValidating, setTituloValidating] = useState(false);
    
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    
    const [tituloTouched, setTituloTouched] = useState(false);
    const [contenidoTouched, setContenidoTouched] = useState(false);
    const [materiaTouched, setMateriaTouched] = useState(false);

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const data = await getMaterias();
                setMaterias(data);
                setLoading(false);
            } catch (err) {
                setMateriaError('Error al cargar materias. Por favor, intente nuevamente.');
                setLoading(false);
            }
        };

        fetchMaterias();
    }, [router]);

    const handleCreateMateria = async () => {
        router.push('/materias/crear');
    };

    const validateForm = async () => {
        let isValid = true;
        
        if (!titulo.trim()) {
            setTituloError('El título es obligatorio');
            isValid = false;
        } else if (titulo.length < 3) {
            setTituloError('El título debe tener al menos 3 caracteres');
            isValid = false;
        } else {
            setTituloValidating(true);
            try {
                const isUnique = await checkTituloUnico(titulo, materiaID ? Number(materiaID) : undefined);
                if (!isUnique) {
                    setTituloError('El título ya existe para esta materia');
                    isValid = false;
                } else {
                    setTituloError('');
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setTituloError(err.message);
                } else {
                    setTituloError('Error al verificar el título. Por favor, intente nuevamente.');
                }
                isValid = false;
            } finally {
                setTituloValidating(false);
            }
        }
        
        if (!contenido.trim()) {
            setContenidoError('El contenido es obligatorio');
            isValid = false;
        } else {
            setContenidoError('');
        }
        
        if (!materiaID) {
            setMateriaError('Debe seleccionar una materia');
            isValid = false;
        } else {
            setMateriaError('');
        }
        
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setTituloTouched(true);
        setContenidoTouched(true);
        setMateriaTouched(true);
        
        const isValid = await validateForm();
        if (!isValid) {
            return;
        }
        
        setSubmitting(true);
        
        try {
            await createNota({
                titulo,
                contenido,
                prioridad,
                materiaID: Number(materiaID)
            });
            
            setSnackbarMessage('Nota creada exitosamente');
            setSnackbarOpen(true);
            
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (err: unknown) {
            if (err instanceof Error) {
      
                if (err.message.includes('título ya existe') || 
                    err.message.includes('TITULO_DUPLICADO')) {
                    setTituloError('El título ya existe para esta materia');
                } else {
                    setMateriaError(err.message);
                }
                } else {
                setMateriaError('Error al crear la nota. Por favor, intente nuevamente.');
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
        <Container maxWidth="xl" sx={{ mt: 0, p: 0 }}>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: 'calc(100vh - 64px)',
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    alignItems: 'center', 
                    mb: 2,
                    px: 2
                }}> 
                    <Box>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => router.back()}
                            startIcon={<CloseIcon />}
                            sx={{ mr: 0, mt:0 }}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Box>
                
                <Box sx={{ 
                    display: 'flex', 
                    flexGrow: 1,
                    gap: 2,
                    height: 'calc(100% - 60px)'
                }}>
                    <Box sx={{ 
                        flex: '1 1 70%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        height: '100%'
                    }}>
                        <Card variant="outlined" sx={{ 
                            borderRadius: 2, 
                            boxShadow: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%'
                        }}>
                            <CardContent sx={{ 
                                flex: 1,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                '&:last-child': { pb: 2 }
                            }}>
                                <TextField
                                    value={titulo}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setTitulo(e.target.value);
                                        if (tituloTouched) {
                                            if (e.target.value.length < 3) {
                                                setTituloError('El título debe tener al menos 3 caracteres');
                                            } else {
                                                setTituloError('');
                                            }
                                        }
                                    }}
                                    onBlur={() => setTituloTouched(true)}
                                    placeholder="Título de la nota"
                                    variant="standard"
                                    fullWidth
                                    error={!!tituloError && tituloTouched}
                                    helperText={tituloTouched ? tituloError : ''}
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            fontSize: '1.8rem',
                                            fontWeight: 600,
                                            '&:focus': {
                                                backgroundColor: 'action.hover'
                                            }
                                        }
                                    }}
                                    InputLabelProps={{ shrink: false }}
                                />
                                
                                <TextField
                                    value={contenido}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setContenido(e.target.value);
                                        if (contenidoTouched && !e.target.value.trim()) {
                                            setContenidoError('El contenido es obligatorio');
                                        } else if (contenidoTouched) {
                                            setContenidoError('');
                                        }
                                    }}
                                    onBlur={() => setContenidoTouched(true)}
                                    multiline
                                    fullWidth
                                    placeholder="Escribe algo..."
                                    variant="standard"
                                    error={!!contenidoError && contenidoTouched}
                                    helperText={contenidoTouched ? contenidoError : ''}
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            fontSize: '1rem',
                                            minHeight: 'calc(100% - 40px)',
                                            '& textarea': {
                                                minHeight: 'calc(100% - 40px) !important',
                                                resize: 'none'
                                            }
                                        }
                                    }}
                                    InputLabelProps={{ shrink: false }}
                                    sx={{ mt: 2 }}
                                />
                            </CardContent>
                        </Card>
                    </Box>
                    
                    <Box sx={{ 
                        flex: '1 1 30%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        height: '100%'
                    }}>
                        <Card variant="outlined" sx={{ 
                            borderRadius: 2, 
                            boxShadow: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%'
                        }}>
                            <CardContent sx={{ 
                                flex: 1,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                '&:last-child': { pb: 2 }
                            }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    mb: 2 
                                }}>
                                    <Typography variant="h6" fontWeight="bold" color="primary">
                                        Detalles
                                    </Typography>
                                </Box>
                                
                                <FormControl 
                                    fullWidth 
                                    required 
                                    sx={{ mb: 2 }} 
                                    error={!!materiaError && materiaTouched}
                                >
                                    <InputLabel>Materia</InputLabel>
                                    <Select
                                        value={materiaID}
                                        label="Materia"
                                        onChange={(e) => {
                                            setMateriaID(e.target.value as number);
                                            if (materiaTouched) {
                                                setMateriaError('');
                                            }
                                        }}
                                        onBlur={() => setMateriaTouched(true)}
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
                                    {materiaTouched && materiaError && (
                                        <FormHelperText error>{materiaError}</FormHelperText>
                                    )}
                                </FormControl>
                                
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                                    <Button
                                        variant="text"
                                        color="primary"
                                        startIcon={<AddCircleOutlineIcon />}
                                        onClick={handleCreateMateria}
                                        disabled={submitting}
                                    >
                                        Nueva materia
                                    </Button>
                                </Box>
                                
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <InputLabel>Prioridad</InputLabel>
                                    <Select
                                        value={prioridad}
                                        label="Prioridad"
                                        onChange={(e) => setPrioridad(e.target.value as 'ALTA' | 'MEDIA' | 'BAJA')}
                                        disabled={submitting}
                                    >
                                        <MenuItem value="ALTA">
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Box 
                                                    sx={{ 
                                                        width: 12, 
                                                        height: 12, 
                                                        borderRadius: '50%', 
                                                        backgroundColor: '#4b2c5e', 
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
                                                        backgroundColor: '#1f4d3a', 
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
                                                        backgroundColor: '#6a1f2a', 
                                                        mr: 1 
                                                    }} 
                                                />
                                                Baja
                                            </Box>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                
                                <Box sx={{ mt: 'auto' }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={submitting}
                                        fullWidth
                                        size="large"
                                        onClick={handleSubmit}
                                        sx={{ 
                                            backgroundColor: '#234e68',
                                            fontWeight: 'bold',
                                            py: 1.5
                                        }}
                                    >
                                        {submitting ? (
                                            <>
                                                <CircularProgress size={24} sx={{ mr: 1 }} />
                                                Guardando...
                                            </>
                                        ) : 'Guardar Nota'}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
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