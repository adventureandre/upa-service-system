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
    synthesize: (text: string) => Promise<void>
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
        try {
            const response = await api(`/client/${id}`)
            const data = await response.json()
            return data
        } catch (err) {
            console.log(err)
        }
    },

    synthesize: async (text: string) => {
        try {
            const response = await api('/synthesize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text })
            });

            if (!response.ok) {
                throw new Error('Erro na requisição');
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            // // Adiciona um botão temporário para interação do usuário
            // const button = document.createElement('button');
            // button.style.display = 'none';
            // document.body.appendChild(button);
            // button.click();
           // document.body.removeChild(button);

            await audio.play().catch((error) => {
                console.error('Erro ao reproduzir áudio:', error);
            });

            // Limpa a URL do objeto após a reprodução
            audio.onended = () => {
                URL.revokeObjectURL(audioUrl);
            };
        } catch (error) {
            console.error('Erro ao sintetizar:', error);
        }
    }
}));
