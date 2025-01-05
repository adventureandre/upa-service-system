"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectLabel } from "@/components/ui/select";
import { clienteStore } from "@/store/clienteStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContent, SelectGroup, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Definindo o esquema de validação com Zod
const formSchema = z.object({
  nome: z.string().min(2, "Nome do paciente é obrigatório")
  .regex(/^[a-zA-Z0-9\s]+$/, "O nome não pode conter caracteres especiais.")
  .transform((nome) =>
    nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()
),
  prioridade: z.string().min(1, "Prioridade é obrigatória"),
});

type formSchemaProps = z.infer<typeof formSchema>;

export default function Home() {
  const router =  useRouter()

  const { create } = clienteStore()

  const form = useForm<formSchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      prioridade: 'low', // Valor padrão para prioridade
    },
  });


  // Função de envio do formulário
  function onSubmit(data: formSchemaProps) {
    create(data)
    form.reset();
    router.push("/tela")

  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Cadastrar Paciente</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* Campo Nome do Paciente */}
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-gray-700">Nome do paciente</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome do paciente"
                    {...field}
                    className="mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500">Nome completo do paciente</FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Campo Prioridade */}
          <FormField
            control={form.control}
            name="prioridade"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-gray-700">Prioridade</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}>
                    <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <SelectValue placeholder="Selecione a Prioridade" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300 rounded-md shadow-sm  w-[250px]">
                      <SelectGroup >
                        <SelectLabel>Prioridade</SelectLabel>
                        <SelectItem value="low">Baixa</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-sm text-gray-500">Defina a prioridade do paciente</FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Botão de Submit */}
          <Button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cadastrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
