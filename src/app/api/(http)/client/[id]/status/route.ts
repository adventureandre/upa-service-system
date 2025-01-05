import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Função para lidar com a requisição PUT
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();  // Pega o status do corpo da requisição
    const cliente = await prisma.cliente.update({
      where: { id: params.id },
      data: { status }, // Atualiza o status do cliente
    });

    return NextResponse.json(cliente);
  } catch (error) {
    console.log(error)  // Em caso de erro
  }
}

// Caso você queira manipular outras requisições, como GET, POST, etc.

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: params.id }
    });

    if (!cliente) {
      return NextResponse.error(); // 404 se não encontrar o cliente
    }

    return NextResponse.json(cliente); // Retorna o cliente no formato JSON
  } catch (error) {
    console.log(error)  // Em caso de erro
  }
}
