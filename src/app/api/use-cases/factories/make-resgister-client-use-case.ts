import { PrismaClientRepository } from '../../repository/prisma/prisma-client-repository'
import { RegisterClienteUseCase } from '../registerCliente'


export function makeRegisterClientUseCase() {
  const ClientRepository = new PrismaClientRepository()
  const registerUserCase = new RegisterClienteUseCase(ClientRepository)

  return registerUserCase
}
