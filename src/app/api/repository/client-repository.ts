import { Cliente, Prisma,  } from "@prisma/client"

export interface ClientRepository {
    create(data: Prisma.ClienteCreateInput): Promise<Cliente>
    findById(id: string): Promise<Cliente | null>
    findAll():Promise<Cliente[]>
}