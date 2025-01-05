import { api } from "@/lib/api";
import { Cliente, Prisma } from "@prisma/client";
import { create } from "zustand";

type ClienteStore = {
    clientes: Cliente[] | null,
    isLoading: boolean,
    create: (data: Prisma.ClienteCreateInput) => void
    load: () => Promise<void>
}

export const clienteStore = create<ClienteStore>((set) => ({
    // States
    clientes: null,
    isLoading: false,

    // Functions

    load: async () => {
        set({ isLoading: true })

        try {
            const response = await api('/client')
            const data = await response.json()

            set({isLoading: false, clientes:data.clientes})
        } catch (error) {
            console.error('Failed to fetch clients:', error)
            set({ isLoading: false }) 
        }

    },

    create: async (data) => {
        try {
            await api('/client', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
                },
                body: JSON.stringify(data)

            })

        } catch (err) {
            console.log(err)
        }
    },
}));
