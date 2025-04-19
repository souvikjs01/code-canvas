"use server"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { prisma } from "../prisma"

export const isUserPro = async (id: string) => {
    const { userId } = await auth()
    if(!userId) {
        redirect('/sign-in')
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                id
            },
            select: {
                isPro: true
            }
        })
        if(!user) {
            return { success: false, error: "User not found" }
        }
        return { success: true, data: user }
    } catch (error) {
        return { success: false, error: "Internal server error" }
    }
}