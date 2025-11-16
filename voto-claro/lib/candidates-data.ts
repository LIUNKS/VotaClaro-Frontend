export interface Candidate {
  id: number;
  name: string;
  party: string;
  image: string;
  photo: string;
  position: string;
  category?: 'presidencial' | 'congresista' | 'senador' | 'andino';
  age: number;
  birthPlace: string;
  education: {
    level: string;
    institution: string;
    degree?: string;
  }[];
  experience: {
    period: string;
    position: string;
    company: string;
    description?: string;
  }[];
  governmentPlan?: {
    title: string;
    description: string;
    details?: string[];
  }[];
  proposals?: {
    title: string;
    description: string;
  }[];
}

export const candidatesData: Candidate[] = [
	{
		id: 1,
		name: 'Julio Guzmán Cáceres',
		party: 'Partido Morado',
		image: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
		photo: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
		position: 'Candidato a la Presidencia',
		category: 'presidencial',
		age: 54,
		birthPlace: 'Lima, Perú',
		education: [
			{
				level: 'Universidad',
				institution: 'Universidad del Pacífico',
				degree: 'Licenciatura en Economía'
			},
			{
				level: 'Postgrado',
				institution: 'Georgetown University',
				degree: 'Maestría en Políticas Públicas'
			}
		],
		experience: [
			{
				period: '2019-2024',
				position: 'Congresista de la República',
				company: 'Congreso del Perú',
				description: 'Presidente de la Comisión de Educación, Juventud y Deporte'
			},
			{
				period: '2010-2019',
				position: 'Consultor Senior',
				company: 'Banco Mundial',
				description: 'Especialista en desarrollo económico y políticas públicas'
			}
		],
		governmentPlan: [
			{
				title: 'Educación de Calidad',
				description: 'Reforma integral del sistema educativo peruano',
				details: [
					'Aumento del presupuesto educativo al 6% del PBI',
					'Mejora de la infraestructura educativa',
					'Capacitación continua para docentes',
					'Digitalización de las aulas'
				]
			},
			{
				title: 'Economía Sostenible',
				description: 'Crecimiento económico con inclusión social',
				details: [
					'Apoyo a las MYPE y emprendedores',
					'Diversificación de la matriz productiva',
					'Promoción de la innovación tecnológica'
				]
			}
		],
		proposals: [
			{
				title: 'Universidad Gratuita',
				description: 'Implementar educación universitaria gratuita para estudiantes de bajos recursos con alto rendimiento académico'
			},
			{
				title: 'Revolución Digital',
				description: 'Digitalizar todos los servicios públicos y promover el gobierno electrónico'
			}
		]
	},
	{
		id: 2,
		name: 'Verónika Mendoza Frisch',
		party: 'Juntos por el Perú',
		image: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
		photo: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
		position: 'Candidata a la Presidencia',
		category: 'presidencial',
		age: 44,
		birthPlace: 'Cusco, Perú',
		education: [
			{
				level: 'Universidad',
				institution: 'Universidad Nacional Mayor de San Marcos',
				degree: 'Licenciatura en Psicología'
			},
			{
				level: 'Postgrado',
				institution: 'Universidad de París',
				degree: 'Maestría en Cooperación Internacional'
			}
		],
		experience: [
			{
				period: '2011-2016',
				position: 'Congresista de la República',
				company: 'Congreso del Perú',
				description: 'Miembro de las comisiones de Mujer y Desarrollo Social'
			},
			{
				period: '2006-2011',
				position: 'Activista Social',
				company: 'Organizaciones de Base',
				description: 'Trabajo comunitario en zonas rurales del Cusco'
			}
		],
		governmentPlan: [
			{
				title: 'Justicia Social',
				description: 'Reducir la desigualdad y garantizar derechos básicos',
				details: [
					'Reforma tributaria progresiva',
					'Fortalecimiento del sistema de salud pública',
					'Programas de vivienda social',
					'Protección de derechos laborales'
				]
			}
		],
		proposals: [
			{
				title: 'Nueva Constitución',
				description: 'Convocar a una Asamblea Constituyente para redactar una nueva Constitución más inclusiva'
			},
			{
				title: 'Renta Básica Universal',
				description: 'Implementar un sistema de renta básica para las familias más vulnerables'
			}
		]
	},
	{
		id: 3,
		name: 'George Forsyth Sommer',
		party: 'Victoria Nacional',
		image: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
		photo: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
		position: 'Candidato a la Presidencia',
		category: 'presidencial',
		age: 42,
		birthPlace: 'Lima, Perú',
		education: [
			{
				level: 'Universidad',
				institution: 'Universidad de Lima',
				degree: 'Licenciatura en Administración'
			}
		],
		experience: [
			{
				period: '2019-2022',
				position: 'Alcalde',
				company: 'Municipalidad de La Victoria',
				description: 'Modernización y mejora de servicios municipales'
			},
			{
				period: '2000-2015',
				position: 'Futbolista Profesional',
				company: 'Diversos clubes',
				description: 'Carrera deportiva en el fútbol peruano e internacional'
			}
		],
		governmentPlan: [
			{
				title: 'Seguridad Ciudadana',
				description: 'Plan integral para combatir la delincuencia',
				details: [
					'Modernización de la Policía Nacional',
					'Instalación de cámaras de seguridad',
					'Programas de prevención juvenil'
				]
			}
		],
		proposals: [
			{
				title: 'Perú Seguro',
				description: 'Implementar un sistema nacional de videovigilancia y patrullaje inteligente'
			}
		]
	},
	{
		id: 4,
		name: 'Keiko Fujimori Higuchi',
		party: 'Fuerza Popular',
		image: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
		photo: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
		position: 'Candidata a la Presidencia',
		category: 'presidencial',
		age: 49,
		birthPlace: 'Lima, Perú',
		education: [
			{
				level: 'Universidad',
				institution: 'Boston University',
				degree: 'Licenciatura en Administración de Empresas'
			},
			{
				level: 'Postgrado',
				institution: 'Columbia University',
				degree: 'Maestría en Administración Pública'
			}
		],
		experience: [
			{
				period: '2006-2011',
				position: 'Congresista de la República',
				company: 'Congreso del Perú',
				description: 'Presidenta de la Comisión de Relaciones Exteriores'
			},
			{
				period: '1994-2000',
				position: 'Primera Dama',
				company: 'Presidencia de la República',
				description: 'Actividades protocolares y programas sociales'
			}
		],
		governmentPlan: [
			{
				title: 'Desarrollo Económico',
				description: 'Crecimiento sostenido y generación de empleo',
				details: [
					'Promoción de inversión privada',
					'Simplificación administrativa',
					'Apoyo a exportaciones'
				]
			}
		],
		proposals: [
			{
				title: 'Bono Familiar Universal',
				description: 'Programa de apoyo económico directo a familias peruanas'
			}
		]
	},
	{
		id: 5,
		name: 'María Antonieta Alva',
		party: 'Movimiento Independiente',
		image: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
		photo: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
		position: 'Candidata a la Presidencia',
		category: 'presidencial',
		age: 52,
		birthPlace: 'Lima, Perú',
		education: [
			{
				level: 'Universidad',
				institution: 'Universidad del Pacífico',
				degree: 'Licenciatura en Economía'
			},
			{
				level: 'Postgrado',
				institution: 'Harvard University',
				degree: 'Maestría en Políticas Públicas'
			}
		],
		experience: [
			{
				period: '2019-2020',
				position: 'Ministra de Economía y Finanzas',
				company: 'Poder Ejecutivo',
				description: 'Gestión económica durante la pandemia de COVID-19'
			},
			{
				period: '2010-2019',
				position: 'Viceministra',
				company: 'Ministerio de Economía y Finanzas',
				description: 'Especialista en política fiscal y presupuesto público'
			}
		],
		governmentPlan: [
			{
				title: 'Gestión Eficiente',
				description: 'Modernización del Estado y mejora de servicios públicos',
				details: [
					'Digitalización de trámites',
					'Transparencia en la gestión pública',
					'Meritocracia en el servicio civil'
				]
			}
		],
		proposals: [
			{
				title: 'Estado Digital',
				description: 'Transformar todos los servicios públicos a plataformas digitales eficientes'
			}
		]
	},
	{
		id: 6,
		name: 'Hernando de Soto Polar',
		party: 'Avanza País',
		image: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
		photo: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
		position: 'Candidato a la Presidencia',
		category: 'presidencial',
		age: 83,
		birthPlace: 'Arequipa, Perú',
		education: [
			{
				level: 'Universidad',
				institution: 'Universidad de Ginebra',
				degree: 'Licenciatura en Economía y Derecho'
			}
		],
		experience: [
			{
				period: '1980-2024',
				position: 'Economista y Escritor',
				company: 'Instituto Libertad y Democracia',
				description: 'Investigación sobre economía informal y derechos de propiedad'
			},
			{
				period: '1990-1992',
				position: 'Asesor Presidencial',
				company: 'Presidencia de la República',
				description: 'Asesor en reformas económicas y formalización'
			}
		],
		governmentPlan: [
			{
				title: 'Formalización Económica',
				description: 'Integrar la economía informal al sistema legal',
				details: [
					'Simplificación de trámites de formalización',
					'Titulación masiva de propiedades',
					'Acceso al crédito formal'
				]
			}
		],
		proposals: [
			{
				title: 'El Otro Sendero 2.0',
				description: 'Nueva reforma para formalizar la economía y crear riqueza desde abajo'
			}
		]
	}
];

// Función helper para obtener candidatos por categoría
export const getCandidatesByCategory = (category: string) => {
	return candidatesData.filter(candidate => candidate.category === category);
};

// Función helper para obtener candidatos destacados
export const getFeaturedCandidates = (limit: number = 3) => {
	return candidatesData.slice(0, limit);
};

// Función helper para obtener un candidato por ID
export const getCandidateById = (id: number) => {
	return candidatesData.find(candidate => candidate.id === id);
};