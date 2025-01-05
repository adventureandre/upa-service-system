import { NextRequest, NextResponse } from "next/server";
import { UserAlreadyExistsError } from "../../use-cases/errors/use-already-exists-error";
import { makeRegisterClientUseCase } from "../../use-cases/factories/make-resgister-client-use-case";
import { makeFetchClientesUseCase } from "../../use-cases/factories/make-fetch-clientes.use.case";

export async function GET() {
  try {
    const fetchClientes = makeFetchClientesUseCase()

    const allCliente = await fetchClientes.execute()

    return Response.json(allCliente,{
      status:200
    })

  } catch (err) {
    console.log(err)
  }

}

export async function POST(request: NextRequest) {
  const { nome, prioridade } = await request.json()

  try {
    const registerUserCase = makeRegisterClientUseCase()

    await registerUserCase.execute({
      nome,
      prioridade
    })

    return NextResponse.json(
      { message: 'Client Cadastrado com sucesso!' },
      { status: 201 },
    )
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return NextResponse.json({ message: err.message }, { status: 409 })
    }
    throw err
  }
}