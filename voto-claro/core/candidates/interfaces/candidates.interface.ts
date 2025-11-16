export interface CandidateApiData {
  id: string;
  dni: string;
  url_img?: string;
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
  formacion_academica?: Array<{
    grado: string;
    carrera: string;
    institucion: string;
    anio_fin: string;
  }>;
  experiencia_laboral?: Array<{
    cargo: string;
    organizacion: string;
    desde: string;
    hasta?: string;
  }>;
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
    acciones?: Array<{
      persona_juridica: string;
      tipo: string;
      cantidad: string;
      valor: number;
      comentario?: string;
    }>;
  };
  local_votacion?: {
    schoolName: string;
    address: string;
    tableNumber: string;
    hours: string;
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

// ========== Nueva interfaz para Ciudadano (Citizen) ==========

export interface CitizenVehicle {
  modelo: string;
  anio: string | null;
  placa: string;
  caracteristica: string | null;
  valor: number;
  comentario: string | null;
}

export interface CitizenBienes {
  valor_total: number;
  muebles: any[];
  inmuebles: any[];
  vehiculos: CitizenVehicle[];
  acciones: any[];
}

export interface CitizenLocalVotacion {
  schoolName: string;
  address: string;
  tableNumber: string;
  latitude: number;
  longitude: number;
  hours: string;
  capacity: string;
}

export interface CitizenExperienciaLaboral {
  desde: string;
  hasta: string | null;
  cargo: string;
  organizacion: string;
}

export interface CitizenFormacionAcademica {
  institucion: string;
  carrera: string;
  grado: string;
  anio_fin: number;
}

export interface CitizenData {
  id: string;
  dni: string;
  url_img: string | null;
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
  bienes: CitizenBienes;
  local_votacion: CitizenLocalVotacion;
  experiencia_laboral: CitizenExperienciaLaboral[];
  formacion_academica: CitizenFormacionAcademica[];
  cargos_partidarios: any[];
  cargos_eleccion_popular: any[];
}

// ========== Interfaces para Creación de Candidato ==========

export interface CandidateRequest {
  dni: string;
  politicalPartyId: string;
}

export interface CreateCandidatePayload {
  candidateRequest: CandidateRequest;
  urlImgPerson?: File;
}

export interface CandidateResponse {
  id: string;
  dni: string;
  politicalPartyId: string;
  urlImgPerson: string;
  createdAt?: string;
  updatedAt?: string;
}
