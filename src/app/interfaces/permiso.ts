export interface Permiso {
    id?: number;
    persona_id: number;
    tipo_permiso: string;
    estado_permiso: string; // Cambiado a string
    documento: string;
    fecha_solicitud: string;
    nombre_persona: string;
    apellido_persona: string;
}