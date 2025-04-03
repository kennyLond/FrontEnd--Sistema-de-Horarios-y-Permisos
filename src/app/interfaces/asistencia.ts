export interface Asistencia {
    persona_id: number;
    nombre: string;
    apellido?: string;  // ✅ Agregamos el apellido
    hora_entrada?: string;
    hora_salida?: string | null;
}
