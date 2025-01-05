"use client"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Logo from "../../../../public/assets/imagens/logo.jpeg"
import { clienteStore } from "@/store/clienteStore"
import Image from "next/image"
import { useEffect } from "react"
import { Circle } from "lucide-react"

export default function Tela() {
    const { isLoading, load, clientes } = clienteStore()

    useEffect(() => {
        load()
    }, [load])  // Garantir que o 'load' seja chamado uma vez na montagem


    console.log(clientes)

    return (
        <section >
            <header className="flex flex-row items-center gap-6 bg-blue-500 py-5 px-10 w-full ">
                <Image width={150} height={150} src={Logo} alt="Logo" />
                <h1 className="text-white "><span className="text-xl font-semibold">UPA</span> - Sistema de Atendimento</h1>
            </header>

            <article className=" flex justify-center flex-wrap gap-3 mt-5 mx-5 ">
                <h1 className="text-4xl font-semibold text-red-600">Ana Beatriz Perreia de Souza</h1>
                <p className=" w-full text-center text-2xl ">UPA - Atendimento Médico</p>
                <p className="w-full font-bold"><span className="bg text-blue-500 mr-1 ">Proficional: </span> Milena Camila Nogueira Souza</p>
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
                        <TableRow>
                            <TableCell className="font-medium">
                                <Circle size={32} color="#f50000" strokeWidth={3} absoluteStrokeWidth />
                            </TableCell>
                            <TableCell className="flex-1">Maria Rita Silva</TableCell>
                            <TableCell> <div>UPA - ATENDIMENTO MÉDICO</div><div>Milena Camila Nogueira Souza</div><div>CONSULTÓRIO MÉDICO 01</div> </TableCell>
                            <TableCell className="text-right">15:02 BRT</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-medium">
                                <Circle size={32} color="#17ac2b" strokeWidth={3} absoluteStrokeWidth />
                            </TableCell>
                            <TableCell className="flex-1" >JOAO MARCOS GODOI DE LIMA</TableCell>
                            <TableCell className="w-60"> <div>UPA - ATENDIMENTO MÉDICO</div><div>Milena Camila Nogueira Souza</div><div>CONSULTÓRIO MÉDICO 01</div> </TableCell>
                            <TableCell className="text-right">14:51 BRT</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>


        </section>
    )
}
