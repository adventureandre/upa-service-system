import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// Função para lidar com a requisição PUT
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json(); 
    
    const cliente = await prisma.cliente.update({
      where: { id: params.id },
      data: { status }, 
    });

    return NextResponse.json(cliente);
  } catch (error) {
    console.log(error)  
  }
}


