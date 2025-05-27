
export interface Avaliacao {
  id: string;
  tipo: 'trabalho' | 'av1' | 'av2' | 'teste';
  nome: string;
  nota: number;
  peso: number;
}

export interface BimestreDetalhado {
  avaliacoes: Avaliacao[];
  diasLetivos: number;
  faltas: number;
  frequencia: number;
  notaFinal: number;
  precisaRecuperacao?: boolean;
  notaRecuperacao?: number;
  notaFinalComRecuperacao?: number;
  aprovado?: boolean;
}

export interface DisciplinaCompleta {
  id: string;
  nome: string;
  aulasPorBimestre: number;
  aulasPorAno: number;
  bimestre1: BimestreDetalhado;
  bimestre2: BimestreDetalhado;
  bimestre3: BimestreDetalhado;
  bimestre4: BimestreDetalhado;
  media: number;
  frequenciaTotal: number;
  situacao: string;
}

export const calcularNotaBimestre = (avaliacoes: Avaliacao[]): number => {
  if (avaliacoes.length === 0) return 0;
  
  const somaNotas = avaliacoes.reduce((acc, av) => acc + (av.nota * av.peso), 0);
  const somaPesos = avaliacoes.reduce((acc, av) => acc + av.peso, 0);
  
  return somaPesos > 0 ? somaNotas / somaPesos : 0;
};

export const calcularFrequencia = (diasLetivos: number, faltas: number): number => {
  if (diasLetivos === 0) return 100;
  return Math.max(0, ((diasLetivos - faltas) / diasLetivos) * 100);
};

export const calcularSituacaoComRecuperacao = (notaFinal: number, notaRecuperacao?: number): { 
  precisaRecuperacao: boolean;
  notaFinalComRecuperacao: number;
  aprovado: boolean;
} => {
  const mediaMinima = 6.0;
  
  if (notaFinal >= mediaMinima) {
    return {
      precisaRecuperacao: false,
      notaFinalComRecuperacao: notaFinal,
      aprovado: true
    };
  }
  
  // Precisa de recuperação
  if (notaRecuperacao !== undefined) {
    const notaComRecuperacao = Math.max(notaFinal, notaRecuperacao);
    return {
      precisaRecuperacao: true,
      notaFinalComRecuperacao: notaComRecuperacao,
      aprovado: notaComRecuperacao >= mediaMinima
    };
  }
  
  return {
    precisaRecuperacao: true,
    notaFinalComRecuperacao: notaFinal,
    aprovado: false
  };
};

export const calcularSituacao = (media: number, frequenciaTotal: number): string => {
  const mediaMinima = 6.0;
  const frequenciaMinima = 75;
  
  if (media >= mediaMinima && frequenciaTotal >= frequenciaMinima) {
    return 'Aprovado';
  } else if (frequenciaTotal < frequenciaMinima) {
    return 'Reprovado por Falta';
  } else {
    return 'Reprovado';
  }
};
