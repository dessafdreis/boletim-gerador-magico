
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { studentGrades } from '@/data/studentData';

interface GradeChartProps {
  studentName?: string;
}

const GradeChart = ({ studentName }: GradeChartProps) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Tentar carregar dados do relatório final
    const relatorioSalvo = localStorage.getItem('relatorioFinal');
    
    let dataToUse = studentGrades;
    
    if (relatorioSalvo) {
      const relatorio = JSON.parse(relatorioSalvo);
      dataToUse = relatorio.map((item: any) => ({
        disciplina: item.disciplina,
        bimestre1: item.bimestre1,
        bimestre2: item.bimestre2,
        bimestre3: item.bimestre3,
        bimestre4: item.bimestre4,
        media: item.media,
        situacao: item.situacao
      }));
    }

    const formattedData = dataToUse.map((grade: any) => ({
      disciplina: grade.disciplina.length > 10 ? grade.disciplina.substring(0, 10) + '...' : grade.disciplina,
      '1º Bimestre': grade.bimestre1.nota,
      '2º Bimestre': grade.bimestre2.nota,
      '3º Bimestre': grade.bimestre3.nota,
      '4º Bimestre': grade.bimestre4.nota,
    }));

    setChartData(formattedData);
  }, []);

  return (
    <div className="w-full h-96 mt-8">
      <h3 className="text-xl font-bold text-red-800 text-center mb-4">
        Desempenho por Bimestre - {studentName || "Aluno"}
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="disciplina" 
            angle={-45}
            textAnchor="end"
            height={100}
            fontSize={12}
          />
          <YAxis domain={[0, 10]} />
          <Legend />
          <Bar dataKey="1º Bimestre" fill="#dc2626" />
          <Bar dataKey="2º Bimestre" fill="#eab308" />
          <Bar dataKey="3º Bimestre" fill="#16a34a" />
          <Bar dataKey="4º Bimestre" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradeChart;
