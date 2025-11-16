export interface CandidateApiData {
  id: string;
  dni: string;
  nombre_completo: string;
  datos_personales: {
    fecha_nacimiento: string;
    sexo: string;
    educacion: string;
    lugar_nacimiento: {
      pais: string;
      departamento: string;
      provincia: string;
      distrito: string;
    };
    domicilio: string;
  };
  antecedentes: {
    total: number;
    penales: number;
    obligaciones: number;
    lista_sentencias: any[];
  };
  ingresos: {
    total: number;
    publico: number;
    privado: number;
    renta_publico: number;
    renta_privado: number;
    otro_ingreso_publico: number;
    otro_ingreso_privado: number;
  };
  bienes: {
    valor_total: number;
    muebles: any[];
    inmuebles: any[];
    vehiculos: any[];
  };
}

export interface CandidatesApiResponse {
  success: boolean;
  data: CandidateApiData[];
  error?: string;
  lastUpdated: string;
}

export interface AdaptedCandidate {
  id: string;
  name: string;
  party: string;
  image: string;
  dni: string;
  sexo: string;
  educacion: string;
  antecedentes: number;
  ingresos: number;
}