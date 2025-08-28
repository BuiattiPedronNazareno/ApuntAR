import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import Link from "next/link";


interface NoteCardProps {
    id: number;
    titulo: string;
    contenido: string;
    prioridad: string;
}

export default function NoteCard({id, titulo, contenido, prioridad}: NoteCardProps){
    return (
        <Card sx={{
            minWidth: 275,
            margin: 2,
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'scale(1.02)',
            }
        }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    maxHeight: '4.5rem',
                    margin: '10px 0'
                }}>
                    {contenido}
                </Typography>
                <Chip
                    label={prioridad}
                    color={prioridad === 'ALTA' ? 'error': prioridad === 'MEDIA' ? 'warning' : 'info'}
                    sx={{
                        fontWeight: 'bold',
                        borderRadius: 16,
                        padding: '2px 10px'
                    }}
                />
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" component={Link} href={`/notas/${id}`}>
                    Ver detalles
                </Button>
            </CardActions>
        </Card>
    );
}