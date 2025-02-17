"use client"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Logo from "../../../../public/assets/imagens/logo.png"
import { clienteStore } from "@/store/clienteStore"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Circle } from "lucide-react"
import { onValue, ref } from "firebase/database"
import { database } from "@/lib/firebaseConfig"

import { Cliente } from "@prisma/client"

export default function Tela() {
    const { load, clientes, synthesize } = clienteStore()
    const [clienteChamando, setClienteChamando] = useState<Cliente | null>(null)

    useEffect(() => {
        load()
    }, [load])


    useEffect(() => {
        const nameRef = ref(database, "chamada");
        const unsubscribe = onValue(nameRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setClienteChamando(data.cliente);
            } else {
                setClienteChamando(null); 
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (clienteChamando?.nome) {
            synthesize("Paciente " + clienteChamando.nome + " favor comparecer ao consultório médico 01.");
        }
    }, [clienteChamando, synthesize])

    return (
        <section>
            <header className="flex flex-row items-center gap-6 bg-blue-500 py-5 px-10 w-full ">
                <Image width={150} height={150} src={Logo} alt="Logo" priority />
                <h1 className="text-white "><span className="text-xl font-semibold">UPA</span> - Sistema de Atendimento</h1>
            </header>

            <article className="flex justify-center flex-wrap gap-3 mt-5 mx-5 ">
                {clienteChamando ? (


                    <div className="w-full flex flex-wrap justify-center" key={clienteChamando.id}>
                        <h1 className="text-4xl font-semibold text-red-600 flex gap-6">
                            {clienteChamando.nome}
                            <Circle size={32} color={clienteChamando.prioridade === "urgente" ? "#17ac2b" : "#f50000"} strokeWidth={3} />
                        </h1>
                        <p className="w-full text-center text-2xl">UPA - Atendimento Médico</p>
                        <p className="w-full font-bold"><span className="bg text-blue-500 mr-1">Proficional: </span> Milena Camila Nogueira Souza</p>
                    </div>


                ) : (
                    <p className="text-2xl text-gray-500">Nenhum paciente chamado no momento.</p>
                )}
            </article>

            <div className="mx-6">
                <Table className="">
                    <TableCaption>Lista de chamada de pacientes.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">CR</TableHead>
                            <TableHead>Pacientes Chamados</TableHead>
                            <TableHead></TableHead>
                            <TableHead className="text-right">Hora Chamada</TableHead>
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
                                    15:20 BRT
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}