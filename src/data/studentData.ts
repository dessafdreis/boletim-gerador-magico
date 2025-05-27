
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
  bimestre1: { nota: number; frequencia: number };
  bimestre2: { nota: number; frequencia: number };
  bimestre3: { nota: number; frequencia: number };
  bimestre4: { nota: number; frequencia: number };
  media: number;
  situacao: string;
}

export const defaultStudent: Student = {
  id: 123,
  name: "Ana Silva",
  series: "9º Ano",
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
    bimestre1: { nota: 8.5, frequencia: 95 },
    bimestre2: { nota: 7.2, frequencia: 90 },
    bimestre3: { nota: 8.8, frequencia: 88 },
    bimestre4: { nota: 9.1, frequencia: 92 },
    media: 8.4,
    situacao: "Aprovado"
  },
  {
    disciplina: "Português",
    bimestre1: { nota: 7.5, frequencia: 98 },
    bimestre2: { nota: 8.0, frequencia: 95 },
    bimestre3: { nota: 7.8, frequencia: 90 },
    bimestre4: { nota: 8.2, frequencia: 94 },
    media: 7.9,
    situacao: "Aprovado"
  }
];
