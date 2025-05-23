
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';
import { Subject } from '@/data/studentData';

interface DisciplinaEditorProps {
  disciplinas: Subject[];
  onUpdate: (disciplinas: Subject[]) => void;
}

const DisciplinaEditor = ({ disciplinas, onUpdate }: DisciplinaEditorProps) => {
  const [editingDisciplinas, setEditingDisciplinas] = useState<Subject[]>(disciplinas);

  const adicionarDisciplina = () => {
    const novaDisciplina: Subject = {
      name: '',
      aulasPorBimestre: 20,
      aulasPorAno: 80
    };
    setEditingDisciplinas([...editingDisciplinas, novaDisciplina]);
  };

  const removerDisciplina = (index: number) => {
    const novaLista = editingDisciplinas.filter((_, i) => i !== index);
    setEditingDisciplinas(novaLista);
  };

  const atualizarDisciplina = (index: number, campo: keyof Subject, valor: string | number) => {
    const novaLista = [...editingDisciplinas];
    if (campo === 'aulasPorBimestre') {
      novaLista[index].aulasPorBimestre = Number(valor);
      novaLista[index].aulasPorAno = Number(valor) * 4;
    } else {
      (novaLista[index] as any)[campo] = valor;
    }
    setEditingDisciplinas(novaLista);
  };

  const salvarAlteracoes = () => {
    onUpdate(editingDisciplinas);
    localStorage.setItem('disciplinas', JSON.stringify(editingDisciplinas));
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-red-800 text-white">
        <CardTitle>Gerenciar Disciplinas</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {editingDisciplinas.map((disciplina, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <Label>Nome da Disciplina</Label>
                <Input
                  value={disciplina.name}
                  onChange={(e) => atualizarDisciplina(index, 'name', e.target.value)}
                  placeholder="Ex: Matemática"
                />
              </div>
              <div>
                <Label>Aulas por Bimestre</Label>
                <Input
                  type="number"
                  value={disciplina.aulasPorBimestre}
                  onChange={(e) => atualizarDisciplina(index, 'aulasPorBimestre', e.target.value)}
                />
              </div>
              <div>
                <Label>Aulas por Ano</Label>
                <Input
                  type="number"
                  value={disciplina.aulasPorAno}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div className="flex items-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removerDisciplina(index)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <div className="flex gap-2">
            <Button onClick={adicionarDisciplina} className="bg-yellow-500 hover:bg-yellow-600 text-red-900">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Disciplina
            </Button>
            <Button onClick={salvarAlteracoes} className="bg-red-800 hover:bg-red-900">
              Salvar Alterações
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DisciplinaEditor;
