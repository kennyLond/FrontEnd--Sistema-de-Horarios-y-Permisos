export interface Permiso {
    id?: number;
    idPersona: number;
    tipoPermiso: string;
    estado: 'pendiente' | 'aprobado' | 'denegado';
    }