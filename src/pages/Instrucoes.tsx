
import React from 'react';
import { Card } from '@/components/ui/card';

const Instrucoes = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-800 text-center mb-8">
        Instruções Gerais
      </h1>

      <div className="space-y-6">
        <Card className="bg-purple-100 p-6">
          <h2 className="text-xl font-bold text-purple-800 mb-4">
            Como usar o Sistema de Boletim Escolar
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-purple-700">1. Configuração Inicial</h3>
              <p className="text-gray-700">
                Acesse a seção "Configurações" para definir as disciplinas, quantidade de aulas por bimestre, 
                média mínima para aprovação e percentual mínimo de frequência.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-purple-700">2. Lançamento de Notas</h3>
              <p className="text-gray-700">
                Utilize as abas de cada bimestre (1º, 2º, 3º, 4º) para visualizar e lançar as notas 
                e faltas dos alunos em cada disciplina.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-purple-700">3. Cálculos Automáticos</h3>
              <p className="text-gray-700">
                O sistema calcula automaticamente a média final, percentual de frequência e situação 
                do aluno (Aprovado, Reprovado ou Reprovado por Falta).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-purple-700">4. Geração do Boletim</h3>
              <p className="text-gray-700">
                Na seção "Boletim", você pode visualizar o relatório completo com todas as notas, 
                gráficos de desempenho e situação final do aluno.
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200 p-6">
          <h3 className="font-semibold text-yellow-800 mb-2">Critérios de Avaliação</h3>
          <ul className="space-y-2 text-yellow-700">
            <li>• Média mínima para aprovação: 6,0</li>
            <li>• Frequência mínima: 75%</li>
            <li>• O aluno deve atingir tanto a média quanto a frequência mínima</li>
            <li>• Casos especiais são analisados individualmente</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Instrucoes;
