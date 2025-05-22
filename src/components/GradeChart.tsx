
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { studentGrades } from '@/data/studentData';

interface GradeChartProps {
  studentName?: string;
}

const GradeChart = ({ studentName }: GradeChartProps) => {
  const chartData = studentGrades.map(grade => ({
    disciplina: grade.disciplina.length > 10 ? grade.disciplina.substring(0, 10) + '...' : grade.disciplina,
    '1º Bimestre': grade.bimestre1.nota,
    '2º Bimestre': grade.bimestre2.nota,
    '3º Bimestre': grade.bimestre3.nota,
    '4º Bimestre': grade.bimestre4.nota,
  }));

  return (
    <div className="w-full h-96 mt-8">
      <h3 className="text-xl font-bold text-red-800 text-center mb-4">
        {studentName || "Desempenho do Aluno"}
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
          <Bar dataKey="1º Bimestre" fill="#22c55e" />
          <Bar dataKey="2º Bimestre" fill="#3b82f6" />
          <Bar dataKey="3º Bimestre" fill="#f59e0b" />
          <Bar dataKey="4º Bimestre" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradeChart;
