import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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