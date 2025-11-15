// Datos simulados para diferentes DNIs
// Este es un mock temporal hasta que se integre la API del backend

export interface VotingLocationData {
  dni: string;
  schoolName: string;
  address: string;
  tableNumber: string;
  latitude: number;
  longitude: number;
  hours: string;
  capacity: string;
  facilities: string[];
}

export const mockVotingLocations: { [key: string]: VotingLocationData } = {
  "12345678": {
    dni: "12345678",
    schoolName: "Colegio Nacional San José",
    address: "Av. Principal 123, Miraflores, Lima",
    tableNumber: "012345",
    latitude: -12.1203,
    longitude: -77.0282,
    hours: "8:00 AM - 6:00 PM",
    capacity: "350 votantes",
    facilities: [
      "Acceso para personas con discapacidad",
      "Estacionamiento disponible",
      "Transporte público cercano",
      "Servicio de agua y baños",
    ],
  },
  "87654321": {
    dni: "87654321",
    schoolName: "IE. María Auxiliadora",
    address: "Jr. Libertad 456, San Isidro, Lima",
    tableNumber: "056789",
    latitude: -12.0921,
    longitude: -77.0364,
    hours: "8:00 AM - 6:00 PM",
    capacity: "280 votantes",
    facilities: [
      "Acceso para personas con discapacidad",
      "Estacionamiento limitado",
      "Cerca a estación del metropolitano",
      "Servicios básicos disponibles",
    ],
  },
  "11223344": {
    dni: "11223344",
    schoolName: "Colegio Particular San Antonio",
    address: "Av. Los Álamos 789, Surco, Lima",
    tableNumber: "034567",
    latitude: -12.1690,
    longitude: -76.9739,
    hours: "8:00 AM - 6:00 PM",
    capacity: "420 votantes",
    facilities: [
      "Acceso para personas con discapacidad",
      "Amplio estacionamiento",
      "Transporte público disponible",
      "Cafetería en el local",
      "Señalización clara",
    ],
  },
  "99887766": {
    dni: "99887766",
    schoolName: "Universidad Nacional Mayor",
    address: "Ciudad Universitaria, Av. Venezuela cuadra 34, Cercado de Lima",
    tableNumber: "078901",
    latitude: -12.0581,
    longitude: -77.0834,
    hours: "8:00 AM - 6:00 PM",
    capacity: "500 votantes",
    facilities: [
      "Acceso para personas con discapacidad",
      "Estacionamiento para 200 vehículos",
      "Múltiples accesos de transporte público",
      "Servicios médicos básicos",
      "Seguridad 24/7",
    ],
  },
};

// Función para buscar datos por DNI
export const getVotingLocationByDni = (dni: string): VotingLocationData | null => {
  return mockVotingLocations[dni] || null;
};

// Función para obtener datos por defecto (cuando no se encuentra el DNI)
export const getDefaultVotingLocation = (): VotingLocationData => {
  return {
    dni: "00000000",
    schoolName: "Local de Votación Asignado",
    address: "Dirección a ser determinada según tu DNI",
    tableNumber: "000000",
    latitude: -12.0464,
    longitude: -77.0428,
    hours: "",
    capacity: "Información no disponible",
    facilities: getGeneralFacilities(),
  };
};

// Facilidades generales que se muestran cuando no hay DNI específico
export const getGeneralFacilities = (): string[] => {
  return [
    "Todos los locales cuentan con acceso para personas con discapacidad",
    "Servicios básicos disponibles en cada ubicación",
    "Personal capacitado para brindar asistencia",
    "Señalización clara para orientar a los votantes",
    "Implementación de medidas de seguridad y bioseguridad",
    "Ubicaciones estratégicas con acceso a transporte público",
  ];
};

// Interfaz para la respuesta del backend
export interface BackendVotingLocationResponse {
  schoolName: string;
  address: string;
  tableNumber: string;
  latitude: number;
  longitude: number;
  hours: string;
  capacity: string;
}

// Función para convertir respuesta del backend a datos completos
export const createVotingLocationFromBackend = (
  dni: string,
  backendData: BackendVotingLocationResponse
): VotingLocationData => {
  return {
    dni,
    schoolName: backendData.schoolName,
    address: backendData.address,
    tableNumber: backendData.tableNumber,
    latitude: backendData.latitude,
    longitude: backendData.longitude,
    hours: backendData.hours,
    capacity: backendData.capacity,
    facilities: getGeneralFacilities(), // Las facilidades siempre serán las generales
  };
};