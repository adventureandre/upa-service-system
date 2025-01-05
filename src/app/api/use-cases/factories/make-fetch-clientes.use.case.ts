import { PrismaClientRepository } from "../../repository/prisma/prisma-client-repository";
import { FetchClientesUseCase } from "../fetch-clientes";

export function makeFetchClientesUseCase() {
    const ClientRepository = new PrismaClientRepository();
    const fetchClientesUseCase = new FetchClientesUseCase(ClientRepository)
    return fetchClientesUseCase
}