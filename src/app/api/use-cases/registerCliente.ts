import { Cliente } from "@prisma/client";
import { ClientRepository } from "../repository/client-repository";

interface RegisterClienteUseCaseRequest {
    nome: string;
    prioridade: string;
}

interface RegisterClienteUseCaseResponse {
    client: Cliente
}

export class RegisterClienteUseCase {
    constructor(private clienteRepository: ClientRepository) { }

    async execute({
        nome,
        prioridade
    }: RegisterClienteUseCaseRequest): Promise<RegisterClienteUseCaseResponse> {
        
        const client = await this.clienteRepository.create({
            nome,
            prioridade
        })

        return { client }

    }
}