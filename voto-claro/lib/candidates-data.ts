export interface Candidate {
  id: number;
  name: string;
  party: string;
  image: string;
  category?: 'presidencial' | 'congresista' | 'senador' | 'andino';
}

export const candidatesData: Candidate[] = [
  {
    id: 1,
    name: 'Julio Guzmán Cáceres',
    party: 'Partido Morado',
    image: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
    category: 'presidencial'
  },
  {
    id: 2,
    name: 'Verónika Mendoza Frisch',
    party: 'Juntos por el Perú',
    image: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
    category: 'presidencial'
  },
  {
    id: 3,
    name: 'George Forsyth Sommer',
    party: 'Victoria Nacional',
    image: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
    category: 'presidencial'
  },
  {
    id: 4,
    name: 'Keiko Fujimori Higuchi',
    party: 'Fuerza Popular',
    image: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
    category: 'presidencial'
  },
  {
    id: 5,
    name: 'María Antonieta Alva',
    party: 'Movimiento Independiente',
    image: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
    category: 'presidencial'
  },
  {
    id: 6,
    name: 'Hernando de Soto Polar',
    party: 'Avanza País',
    image: 'https://i.pinimg.com/736x/4d/76/a3/4d76a3603204b1ac48fdb29383653cdd.jpg',
    category: 'presidencial'
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