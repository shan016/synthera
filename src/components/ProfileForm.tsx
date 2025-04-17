"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/client";
import { updateProfile } from "@/lib/actions/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateEmail, updatePassword } from "firebase/auth";
import { Upload, User } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormField from "./FormField";
import { Form } from "./ui/form";
import { toast } from "sonner";

export const ProfileForm = ({ user }: { user: User | null }) => {
    const userLabel = user?.name.split(' ').slice(0, 2).map(x => x.charAt(0).toUpperCase()).join('');

    const [photo, setPhoto] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPhoto(imageUrl);

            try {
                const formData = new FormData();
                formData.append('profilePhoto', file);

                const response = await fetch('/api/profile', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) throw new Error('Upload failed');

                toast.info('Profile photo uploaded.')
            } catch (error) {
                setError('An error occurred during upload.');
                toast.error('Upload failed');
            }
        }
    }

    const formSchema = z.object({
        name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().optional(),
        confirmPassword: z.string().optional()
    }).refine((data) => {
        if (data.password && data.password !== data.confirmPassword) {
            return false;
        }
        return true;
    }, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            password: '',
            confirmPassword: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { email, password, name } = values;
            const currentUser = auth.currentUser;
            const formData = new FormData();

            if (!currentUser) return;

            if (name && user?.name !== name) {
                formData.append('name', name);
            }
            if (email && user?.email !== email) {
                await updateEmail(currentUser, email);
                formData.append('email', email);
            }
            if (password) {
                await updatePassword(currentUser, password);
                formData.append('password', password);
            }
            if ([...formData.entries()].length > 0) {
                const response = await fetch('/api/profile', {
                    method: 'POST',
                    body: formData
                })

                if (!response.ok) return toast.error('Failed to update profile.');

                toast.info('Profile updated.')
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24 border border-accent-foreground">
                <AvatarImage key={photo} src={photo ? photo : user?.profilePhoto?.url} />
                <AvatarFallback>{userLabel}</AvatarFallback>
            </Avatar>

            <label htmlFor="image" className="cursor-pointer">
                <input id="image" type="file" accept="image/*" className="hidden" onChange={handleImage} />
                <Button variant="outline" className="flex items-center gap-2" onClick={() => document.getElementById("image")?.click()}>
                    <Upload size={16} />
                    <span>Upload new photo</span>
                </Button>
            </label>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-lg border p-8 rounded-2xl justify-center">
                    <FormField control={form.control} type="text" label="Name" name="name" placeholder="Your name" />
                    <FormField control={form.control} type="text" label="Email" name="email" placeholder="Your email" />
                    <FormField control={form.control} type="text" label="Password" name="password" placeholder="*****" />
                    <FormField control={form.control} type="text" label="Confirm Password" name="confirmPassword" placeholder="*****" />
                    <Button type="submit">Save</Button>
                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}
                </form>
            </Form>
        </div>
    )
}