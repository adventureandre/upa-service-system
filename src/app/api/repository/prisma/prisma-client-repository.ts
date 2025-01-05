import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ClientRepository } from '../client-repository'

export class PrismaClientRepository implements ClientRepository {
  async findAll() {
    return await prisma.cliente.findMany()
  }
  async findById(id: string) {
    const client = await prisma.cliente.findUnique({
      where: { id },
    })

    if (!client) return client

    return client
  }

  async create(data: Prisma.ClienteCreateInput) {
    const cliente = await prisma.cliente.create({
      data,
    })
    return cliente
  }
}
