import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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