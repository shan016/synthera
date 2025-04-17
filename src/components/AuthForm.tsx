"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"

import { Fingerprint } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"
import { config } from "@/constants"

const authFormSchema = (type: 'sign-up' | 'sign-in') => {
    const isSignUp = type === 'sign-up';
    return z.object({
        name: isSignUp ? z.string().min(3, { message: 'Nama mesti sekurang-kurangnya 3 aksara' }) : z.string().optional(),
        email: z.string().email({ message: 'Alamat emel tidak sah' }),
        password: z.string().min(6, { message: 'Kata laluan mesti sekurang-kurangnya 6 aksara' })
            .regex(/[a-zA-Z0-9]/, { message: 'Kata laluan mesti alfanumerik' }),
        confirmPassword: isSignUp ? z.string() : z.string().optional()
    }).refine((data) => {
        if (isSignUp) {
            return data.password === data.confirmPassword;
        }
        return true;
    }, {
        path: ['confirmPassword'],
        message: 'Kata laluan tidak sepadan'
    });
}

const AuthForm = ({ type }: { type: 'sign-in' | 'sign-up' }) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === 'sign-up') {
                const { name, email, password } = values;

                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password
                })

                if (!result?.success) {
                    toast.error(result?.message || 'Pendaftaran gagal');
                    return;
                }
                toast.success(result.message || 'Pendaftaran berjaya. Sila log masuk.');
                router.push('/sign-in')
            } else {
                const { email, password } = values;

                const userCredential = await signInWithEmailAndPassword(auth, email, password);

                const idToken = await userCredential.user.getIdToken();

                if (!idToken) {
                    toast.error('Log masuk gagal.');
                    return;
                }

                const result = await signIn({
                    email, idToken
                });

                toast.success(result.message || 'Log masuk berjaya!');
                router.push(`/dashboard`)
            }
        } catch (error) {
            toast.error('Emel atau kata laluan salah.');
        }
    }

    const isSignIn = type === 'sign-in';

    return (
        <div className="bg-accent p-6 rounded-xl relative shadow-md border">
            <div className="flex flex-col gap-6 card py-8 px-4">
                <div className="flex flex-row gap-2 justify-center">
                    <Fingerprint className="my-auto" />
                    <h2 className="text-3xl text-primary-content tracking-wide font-extrabold">Synthera</h2>
                </div>
                <h3 className="text-center">{config.slogan}</h3>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 mt-4 px-10">
                    {!isSignIn && (
                        <FormField control={form.control} name="name" label="Nama" placeholder="Nama penuh anda" />
                    )}
                    <FormField control={form.control} name="email" label="Emel" placeholder="Alamat emel anda" type="email" />
                    <FormField control={form.control} name="password" label="Kata Laluan" placeholder="*****" type="password" forgot={isSignIn && true} />
                    {!isSignIn && (
                        <FormField control={form.control} name="confirmPassword" placeholder="*****" type="password" label="Ulang Kata Laluan" />
                    )}

                    <p className="text-sm pt-6 text-muted-foreground">Dengan menggunakan servis kami, anda bersetuju dengan <Link href="/terms" className="underline">Terma & Syarat</Link> kami.</p>
                    <Button type="submit">{isSignIn ? 'Log Masuk' : 'Daftar Akaun'}</Button>
                </form>
            </Form>

            <p className="text-center mt-3">
                {isSignIn ? 'Belum ada akaun?' : 'Sudah ada akaun?'}
                <Link href={isSignIn ? '/sign-up' : '/sign-in'} className="font-bold text-primary ml-1">{isSignIn ? 'Daftar' : 'Log Masuk'}</Link>
            </p>
        </div>
    );
}

export default AuthForm;
