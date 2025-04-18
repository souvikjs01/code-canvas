
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { data } = await req.json()
    const id = data.id
    const email = data.email_addresses[0].email_address
    const firstName = data.first_name
    const lastName = data.last_name
    try {
        await prisma.user.create({
            data: {
                id,
                email,
                name: `${firstName} ${lastName}`,
                isPro: false,  
            }
        })
        return NextResponse.json({msg: 'User created successfully'}, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500})        
    }    
}