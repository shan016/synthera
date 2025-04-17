import { signUp } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod'
 
export async function POST(req: Request) {
    try {
        const signUpSchema = z.object({
            email: z.string().email(),
            name: z.string().min(3),
            password: z.string().min(6),
            phone: z.string().min(10).max(15).regex(/^\+?[0-9]{9,12}$/),
        });
    
        const body = await req.json()
        const parsed = signUpSchema.safeParse(body);
    
        if (parsed.error) {
            return NextResponse.json({
                success: false,
                message: 'Invalid data.'
            })
        }
    
        const { email, password, name, phone } = parsed.data;
        const register = await signUp(email, password, name, phone);
        return NextResponse.json(register)
    } catch {
        return NextResponse.json({
            success: false,
            message: 'Something went wrong.'
        })
    }
}