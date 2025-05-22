export interface Student {
  id: number;
  name: string;
  series: string;
  turma: string;
}

export interface Grade {
  disciplina: string;
  bimestre1: { nota: number; faltas: number; frequencia: number };
  bimestre2: { nota: number; faltas: number; frequencia: number };
  bimestre3: { nota: number; faltas: number; frequencia: number };
  bimestre4: { nota: number; faltas: number; frequencia: number };
  media: number;
  frequenciaTotal: number;
  situacao: string;
}

export interface Subject {
  name: string;
  aulasPorBimestre: number;
  aulasPorAno: number;
}

export const defaultStudent: Student = {
  id: 1,
  name: "GUSTAVO NASCIMENTO",
  series: "1º ENSINO MÉDIO",
  turma: "1001"
};

export const subjects: Subject[] = [
  { name: "Artes", aulasPorBimestre: 100, aulasPorAno: 400 },
  { name: "Biologia", aulasPorBimestre: 40, aulasPorAno: 160 },
  { name: "Educação Física", aulasPorBimestre: 30, aulasPorAno: 120 },
  { name: "Espanhol", aulasPorBimestre: 30, aulasPorAno: 120 },
  { name: "Filosofia", aulasPorBimestre: 30, aulasPorAno: 120 },
  { name: "Física", aulasPorBimestre: 30, aulasPorAno: 120 },
  { name: "Geografia", aulasPorBimestre: 20, aulasPorAno: 80 },
  { name: "História", aulasPorBimestre: 20, aulasPorAno: 80 },
  { name: "Língua Inglesa", aulasPorBimestre: 20, aulasPorAno: 80 },
  { name: "Língua Portuguesa", aulasPorBimestre: 25, aulasPorAno: 100 },
  { name: "Literatura", aulasPorBimestre: 25, aulasPorAno: 100 },
  { name: "Matemática", aulasPorBimestre: 25, aulasPorAno: 100 },
  { name: "Química", aulasPorBimestre: 25, aulasPorAno: 100 },
  { name: "Sociologia", aulasPorBimestre: 30, aulasPorAno: 120 }
];

export const studentGrades: Grade[] = [
  {
    disciplina: "Artes",
    bimestre1: { nota: 9.0, faltas: 2, frequencia: 98 },
    bimestre2: { nota: 9.0, faltas: 2, frequencia: 98 },
    bimestre3: { nota: 9.0, faltas: 2, frequencia: 98 },
    bimestre4: { nota: 9.0, faltas: 2, frequencia: 98 },
    media: 9.00,
    frequenciaTotal: 98,
    situacao: "Aprovado"
  },
  {
    disciplina: "Biologia",
    bimestre1: { nota: 5.0, faltas: 4, frequencia: 90 },
    bimestre2: { nota: 5.0, faltas: 4, frequencia: 90 },
    bimestre3: { nota: 5.0, faltas: 4, frequencia: 90 },
    bimestre4: { nota: 5.0, faltas: 4, frequencia: 90 },
    media: 5.00,
    frequenciaTotal: 90,
    situacao: "Aprovado"
  },
  {
    disciplina: "Educação Física",
    bimestre1: { nota: 9.0, faltas: 5, frequencia: 83 },
    bimestre2: { nota: 9.0, faltas: 5, frequencia: 83 },
    bimestre3: { nota: 9.0, faltas: 5, frequencia: 83 },
    bimestre4: { nota: 9.0, faltas: 5, frequencia: 83 },
    media: 9.00,
    frequenciaTotal: 83,
    situacao: "Aprovado"
  },
  {
    disciplina: "Espanhol",
    bimestre1: { nota: 7.0, faltas: 3, frequencia: 90 },
    bimestre2: { nota: 7.0, faltas: 3, frequencia: 90 },
    bimestre3: { nota: 7.0, faltas: 3, frequencia: 90 },
    bimestre4: { nota: 7.0, faltas: 3, frequencia: 90 },
    media: 7.00,
    frequenciaTotal: 90,
    situacao: "Aprovado"
  },
  {
    disciplina: "Filosofia",
    bimestre1: { nota: 9.0, faltas: 3, frequencia: 90 },
    bimestre2: { nota: 6.0, faltas: 3, frequencia: 90 },
    bimestre3: { nota: 8.0, faltas: 3, frequencia: 90 },
    bimestre4: { nota: 8.0, faltas: 3, frequencia: 90 },
    media: 7.75,
    frequenciaTotal: 90,
    situacao: "Aprovado"
  },
  {
    disciplina: "Física",
    bimestre1: { nota: 8.0, faltas: 6, frequencia: 80 },
    bimestre2: { nota: 5.0, faltas: 6, frequencia: 80 },
    bimestre3: { nota: 5.0, faltas: 6, frequencia: 80 },
    bimestre4: { nota: 8.0, faltas: 6, frequencia: 80 },
    media: 6.50,
    frequenciaTotal: 80,
    situacao: "Aprovado"
  },
  {
    disciplina: "Geografia",
    bimestre1: { nota: 9.0, faltas: 7, frequencia: 65 },
    bimestre2: { nota: 5.0, faltas: 7, frequencia: 65 },
    bimestre3: { nota: 5.0, faltas: 7, frequencia: 65 },
    bimestre4: { nota: 8.0, faltas: 7, frequencia: 65 },
    media: 6.75,
    frequenciaTotal: 65,
    situacao: "Reprovado por Falta"
  },
  {
    disciplina: "História",
    bimestre1: { nota: 8.0, faltas: 0, frequencia: 100 },
    bimestre2: { nota: 5.0, faltas: 0, frequencia: 100 },
    bimestre3: { nota: 3.0, faltas: 0, frequencia: 100 },
    bimestre4: { nota: 8.0, faltas: 0, frequencia: 100 },
    media: 6.00,
    frequenciaTotal: 100,
    situacao: "Aprovado"
  },
  {
    disciplina: "Língua Inglesa",
    bimestre1: { nota: 9.0, faltas: 8, frequencia: 60 },
    bimestre2: { nota: 9.0, faltas: 8, frequencia: 60 },
    bimestre3: { nota: 9.0, faltas: 8, frequencia: 60 },
    bimestre4: { nota: 6.0, faltas: 8, frequencia: 60 },
    media: 8.25,
    frequenciaTotal: 60,
    situacao: "Aprovado"
  },
  {
    disciplina: "Língua Portuguesa",
    bimestre1: { nota: 10.0, faltas: 10, frequencia: 60 },
    bimestre2: { nota: 10.0, faltas: 10, frequencia: 60 },
    bimestre3: { nota: 10.0, faltas: 10, frequencia: 60 },
    bimestre4: { nota: 10.0, faltas: 10, frequencia: 60 },
    media: 10.00,
    frequenciaTotal: 60,
    situacao: "Aprovado"
  },
  {
    disciplina: "Literatura",
    bimestre1: { nota: 6.0, faltas: 9, frequencia: 64 },
    bimestre2: { nota: 6.0, faltas: 9, frequencia: 64 },
    bimestre3: { nota: 6.0, faltas: 9, frequencia: 64 },
    bimestre4: { nota: 6.0, faltas: 9, frequencia: 64 },
    media: 6.00,
    frequenciaTotal: 64,
    situacao: "Aprovado"
  },
  {
    disciplina: "Matemática",
    bimestre1: { nota: 9.0, faltas: 3, frequencia: 88 },
    bimestre2: { nota: 9.0, faltas: 3, frequencia: 88 },
    bimestre3: { nota: 3.0, faltas: 3, frequencia: 88 },
    bimestre4: { nota: 3.0, faltas: 3, frequencia: 88 },
    media: 6.00,
    frequenciaTotal: 88,
    situacao: "Reprovado"
  },
  {
    disciplina: "Química",
    bimestre1: { nota: 10.0, faltas: 6, frequencia: 76 },
    bimestre2: { nota: 10.0, faltas: 6, frequencia: 76 },
    bimestre3: { nota: 10.0, faltas: 6, frequencia: 76 },
    bimestre4: { nota: 10.0, faltas: 6, frequencia: 76 },
    media: 10.00,
    frequenciaTotal: 76,
    situacao: "Aprovado"
  },
  {
    disciplina: "Sociologia",
    bimestre1: { nota: 9.0, faltas: 10, frequencia: 67 },
    bimestre2: { nota: 8.0, faltas: 10, frequencia: 67 },
    bimestre3: { nota: 8.0, faltas: 10, frequencia: 67 },
    bimestre4: { nota: 8.0, faltas: 10, frequencia: 67 },
    media: 8.25,
    frequenciaTotal: 67,
    situacao: "Aprovado"
  }
];

export const schoolSettings = {
  mediaMinima: 6.0,
  frequenciaMinima: 75,
  serie: "1º ENSINO MÉDIO",
  turma: "1001"
};
