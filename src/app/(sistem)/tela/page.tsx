"use client"
import Logo from "../../../../public/assets/imagens/logo.jpeg"
import { clienteStore } from "@/store/clienteStore"
import Image from "next/image"
import { useEffect } from "react"

export default function Tela() {
    const { isLoading, load, clientes } = clienteStore()

    useEffect(() => {
        load()
    }, [load])  // Garantir que o 'load' seja chamado uma vez na montagem


    console.log(clientes)

    return (
        <section >
            <header className="flex flex-row items-center gap-6 bg-blue-500 py-5 px-10 w-full ">
                <Image width={100} height={100} src={Logo} alt="Logo"/>
                <h1 className="text-white "><span className="text-xl font-semibold">UPA</span> - Sistema de Atendimento</h1>
            </header>

            <article className=" flex justify-center flex-wrap gap-3 mt-5 mx-5 ">
                <h1 className="text-4xl font-semibold text-red-600">Ana Beatriz Perreia de Souza</h1>
               <p className=" w-full text-center text-2xl ">UPA - Atendimento Médico</p>
               <p className="w-full font-bold"><span className="bg text-blue-500 ">Proficional:</span> Milena Camila Nogueira Souza</p>
            </article>
            
        </section>
    )
}
