import { Cliente } from "@prisma/client";
import { ClientRepository } from "../repository/client-repository";



interface FetchClientesUseCaseResponse {
    clientes: Cliente[]
}

export class FetchClientesUseCase {
    constructor(private clientRepository: ClientRepository){}

    async execute(): Promise<FetchClientesUseCaseResponse> {

        const clientes = await this.clientRepository.findAll()

        return { clientes }

    }

}