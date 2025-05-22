
import React, { useState } from 'react';
import { defaultStudent } from '@/data/studentData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';

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

  const onSubmit = (data: StudentInfoForm) => {
    setStudent({
      name: data.name,
      series: data.series,
      turma: data.turma,
    });
    
    // In a real app, this would update the data in the database
    // For now, we're just updating the local state
    localStorage.setItem('studentInfo', JSON.stringify(data));
    
    toast({
      title: "Informações atualizadas",
      description: "Os dados do aluno foram atualizados com sucesso!",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-red-800">Dados do Aluno</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Aluno</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="bg-red-800 hover:bg-red-900">
              Salvar Alterações
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StudentInfoEditor;
