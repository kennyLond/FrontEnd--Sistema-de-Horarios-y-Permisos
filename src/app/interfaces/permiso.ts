export interface Permiso {
    id?: number;
    persona_id: number;
    tipo_permiso: string;
    estado_permiso: string; // Solo "pendiente" en el frontend
    documento: File | null; // Manejar archivos directamente
    fecha_solicitud: string;
    
}