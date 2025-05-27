
export interface Student {
  id: number;
  name: string;
  series: string;
  turma: string;
}

export interface Subject {
  name: string;
  aulasPorBimestre: number;
  aulasPorAno: number;
}

export interface Grade {
  disciplina: string;
  bimestre1: { nota: number; frequencia: number; faltas?: number };
  bimestre2: { nota: number; frequencia: number; faltas?: number };
  bimestre3: { nota: number; frequencia: number; faltas?: number };
  bimestre4: { nota: number; frequencia: number; faltas?: number };
  media: number;
  situacao: string;
  frequenciaTotal?: number;
}

export const defaultStudent: Student = {
  id: 123,
  name: "Ana Silva",
  series: "9º Ano",
  turma: "A"
};

export const schoolSettings = {
  mediaMinima: 7.0,
  frequenciaMinima: 75,
  serie: "9º Ano",
  turma: "A"
};

export const subjects: Subject[] = [
  { name: "Matemática", aulasPorBimestre: 20, aulasPorAno: 80 },
  { name: "Português", aulasPorBimestre: 20, aulasPorAno: 80 },
  { name: "História", aulasPorBimestre: 15, aulasPorAno: 60 },
  { name: "Geografia", aulasPorBimestre: 15, aulasPorAno: 60 },
  { name: "Ciências", aulasPorBimestre: 20, aulasPorAno: 80 },
  { name: "Inglês", aulasPorBimestre: 10, aulasPorAno: 40 },
  { name: "Educação Física", aulasPorBimestre: 10, aulasPorAno: 40 },
  { name: "Arte", aulasPorBimestre: 10, aulasPorAno: 40 }
];

export const studentGrades: Grade[] = [
  {
    disciplina: "Matemática",
    bimestre1: { nota: 8.5, frequencia: 95, faltas: 1 },
    bimestre2: { nota: 7.2, frequencia: 90, faltas: 2 },
    bimestre3: { nota: 8.8, frequencia: 88, faltas: 2 },
    bimestre4: { nota: 9.1, frequencia: 92, faltas: 2 },
    media: 8.4,
    situacao: "Aprovado",
    frequenciaTotal: 91.25
  },
  {
    disciplina: "Português",
    bimestre1: { nota: 7.5, frequencia: 98, faltas: 0 },
    bimestre2: { nota: 8.0, frequencia: 95, faltas: 1 },
    bimestre3: { nota: 7.8, frequencia: 90, faltas: 2 },
    bimestre4: { nota: 8.2, frequencia: 94, faltas: 1 },
    media: 7.9,
    situacao: "Aprovado",
    frequenciaTotal: 94.25
  }
];
