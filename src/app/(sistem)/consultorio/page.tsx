"use client"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Logo from "../../../../public/assets/imagens/logo.jpeg"
import { clienteStore } from "@/store/clienteStore"
import Image from "next/image"
import { useEffect } from "react"
import { Circle } from "lucide-react"
import { ref, set } from "firebase/database"
import { database } from "@/lib/firebaseConfig"

export default function Consultorio() {
    const { load, clientes, updateStatus } = clienteStore()

    useEffect(() => {
        load()
    }, [load])

    const handleChamarPaciente = async (id: string) => {
        const cliente = clientes.find((cliente) => cliente.id === id);
        
        if (cliente) {
            try {
                // Atualiza status do paciente para chamado
                updateStatus(cliente.id, "chamado");
                
                // Salva nome do paciente na base de dados Firebase
                const nameRef = ref(database, "chamada");
                await set(nameRef, { name: cliente.nome });
            } catch (error) {
                console.error("Erro ao chamar paciente:", error);
            }
        }
    };

    return (
        <section>
            <header className="flex flex-row items-center gap-6 bg-blue-500 py-5 px-10 w-full ">
                <Image width={150} height={150} src={Logo} alt="Logo" priority/>
                <h1 className="text-white "><span className="text-xl font-semibold">UPA</span> - Sistema de Atendimento</h1>
            </header>

            <article className="flex justify-center flex-wrap gap-3 mt-5 mx-5 ">
                <h1 className="text-4xl font-semibold text-red-600">Ana Beatriz Perreia de Souza</h1>
                <p className="w-full text-center text-2xl">UPA - Atendimento Médico</p>
                <p className="w-full font-bold"><span className="bg text-blue-500 mr-1">Proficional: </span> Milena Camila Nogueira Souza</p>
            </article>

            <div className="mx-6">
                <Table>
                    <TableCaption>Lista de chamada de pacientes.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">CR</TableHead>
                            <TableHead>Pacientes Chamados</TableHead>
                            <TableHead></TableHead>
                            <TableHead className="text-right">Ação</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clientes?.map((cliente) => (
                            <TableRow key={cliente.id}>
                                <TableCell className="font-medium">
                                    <Circle size={32} color={cliente.prioridade === "urgente" ? "#17ac2b" : "#f50000"} strokeWidth={3} />
                                </TableCell>
                                <TableCell className="flex-1">{cliente.nome}</TableCell>
                                <TableCell>
                                    <div>UPA - ATENDIMENTO MÉDICO</div>
                                    <div>Milena Camila Nogueira Souza</div>
                                    <div>CONSULTÓRIO MÉDICO 01</div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <button
                                        onClick={() => handleChamarPaciente(cliente.id)}
                                        className="bg-blue-500 text-white py-1 px-4 rounded"
                                    >
                                        Chamar
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}