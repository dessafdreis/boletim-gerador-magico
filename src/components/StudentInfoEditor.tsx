
import React, { useState, useEffect } from 'react';
import { defaultStudent } from '@/data/studentData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

interface StudentInfoForm {
  name: string;
  series: string;
  turma: string;
}

const StudentInfoEditor = () => {
  const [student, setStudent] = useState({
    name: defaultStudent.name,
    series: defaultStudent.series,
    turma: defaultStudent.turma,
  });
  
  const form = useForm<StudentInfoForm>({
    defaultValues: {
      name: student.name,
      series: student.series,
      turma: student.turma,
    },
  });

  useEffect(() => {
    // Carregar dados salvos
    const savedInfo = localStorage.getItem('studentInfo');
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setStudent(parsedInfo);
      form.reset(parsedInfo);
    }
  }, [form]);

  const onSubmit = (data: StudentInfoForm) => {
    setStudent(data);
    localStorage.setItem('studentInfo', JSON.stringify(data));
    
    toast({
      title: "Informações atualizadas",
      description: "Os dados do aluno foram atualizados com sucesso!",
    });

    // Recarregar a página para refletir as mudanças
    window.location.reload();
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-red-800 text-white">
        <CardTitle className="text-xl font-bold">Dados do Aluno</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Aluno</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-red-200 focus:border-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="series"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Série</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-red-200 focus:border-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="turma"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Turma</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-red-200 focus:border-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="bg-red-800 hover:bg-red-900 text-white">
              Salvar Alterações
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StudentInfoEditor;
