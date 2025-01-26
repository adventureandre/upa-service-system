import { api } from "@/lib/api";
import { Cliente } from "@prisma/client";
import { create } from "zustand";

type ClienteStore = {
    clientes: Cliente[],
    create: (data: { nome: string, prioridade: string }) => Promise<void>,
    isLoading: boolean,
    load: () => Promise<void>,
    updateStatus: (id: string, status: string) => void 
    findById: (id: string) => Promise<Cliente>
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

    create: async ({ nome, prioridade }) => {
        try {
            const response = await api("/client", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome, prioridade })

            })
            const data = await response.json()
            return data


        } catch (err) {
            console.log(err)
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
    },

    findById: async (id) => {
        try{
            const response = await api(`/client/${id}`)
            const data = await response.json()
            return data
        }catch(err){
            console.log(err)
        }
    }
}));
