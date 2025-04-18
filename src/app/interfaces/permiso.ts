// permiso.interface.ts
export interface Permiso {
    id?: number;
    persona_id?: number;
    tipo_permiso: string;
    estado_permiso?: string;
    documento?: File | null;
    fecha_solicitud?: string;
    descripcion?: string; 
    dias?: number; 
  }