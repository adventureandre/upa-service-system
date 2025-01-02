import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { makeRegisterUseCase } from "../../use-cases/factories/make-resgister-use-case";
import { UserAlreadyExistsError } from "../../use-cases/errors/use-already-exists-error";

export async function GET() {

    // const { searchParams } = new URL(request.url)
    // const email = searchParams.get('email')


    // // if (email) {
    // //     try {
    // //         const user = await
    // //     } catch (error) {
    // //         return NextResponse.json(
    // //             { error: 'Failed to fetch users' + error },
    // //             {
    // //                 status: 500,
    // //             },
    // //         )
    // //     }
    // // }

    try {
        const allUsers = await prisma.user.findMany()
        return NextResponse.json(allUsers)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch users' + error },
            {
                status: 500,
            },
        )
    }

}

export async function POST(request: NextRequest) {
    const { name, email, password } = await request.json()
  
    try {
      const registerUserCase = makeRegisterUseCase()
  
      await registerUserCase.execute({
        name,
        email,
        password,
      })
  
      return NextResponse.json(
        { message: 'User created successfully' },
        { status: 201 },
      )
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return NextResponse.json({ message: err.message }, { status: 409 })
      }
      throw err
    }
  }