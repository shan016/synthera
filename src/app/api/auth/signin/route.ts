import { signIn } from "@/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const signInSchema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        })

        const parsed = signInSchema.safeParse(body);

        if (parsed.error) {
            return NextResponse.json({
                success: false,
                message: 'Invalid data.'
            })
        }

        const { email, password } = parsed.data;

        const login = await signIn(email, password);
        return NextResponse.json(login);
    } catch {
        // console.error(error);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong.'
        })
    }
}