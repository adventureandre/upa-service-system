import { api } from "@/lib/api";
import { Cliente, Prisma } from "@prisma/client";
import { create } from "zustand";

type ClienteStore = {
    clientes: Cliente[],
    isLoading: boolean,
    load: () => Promise<void>,
    updateStatus: (id: string, status: string) => void // nova função para atualizar o status
}

export const clienteStore = create<ClienteStore>((set) => ({
    // States
    clientes: [],
    isLoading: false,

    // Functions
    load: async () => {
        set({ isLoading: true })
        try {
            const response = await api('/client')
            const data = await response.json()
            set({ isLoading: false, clientes: data.clientes })
        } catch (error) {
            console.error('Failed to fetch users:', error)
        }
    },

    updateStatus: async (id, status) => {
        try {
            await api(`/client/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status })
            })
            // Atualiza localmente o estado após a alteração
            set((state) => ({
                clientes: state.clientes.map((cliente) =>
                    cliente.id === id ? { ...cliente, status } : cliente
                )
            }))
        } catch (err) {
            console.log(err)
        }
    }
}));
