import { supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

export const signUp = async (email: string, password: string, name: string, phone: string) => {
    try {
        const supabase = await createClient();

        const { error, data } = await supabase.auth.signUp({
            email, password, phone, options: {
                data: {
                    full_name: name,
                },
                emailRedirectTo: '/confirm'
            }
        })

        if (error) {
            return {
                success: false,
                message: error.message
            }
        }

        await supabaseAdmin.from('profiles').insert([
            {
                email, name, phone, password,
                id: data.user?.id
            }
        ])

        return {
            success: true,
            message: 'Account registered. Please check your email for confirmation.'
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: 'Something went error.'
        }
    }
}

export const signIn = async (email: string, password: string) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email, password
    })

    if (error) {
        console.error(error)
        return {
            success: false,
            message: error.message
        }
    }

    return {
        success: true,
        message: 'Successfully logged in.'
    }
}

export const getCurrentUser = async () => {
    const supabase = await createClient();

    const { error, data } = await supabase.auth.getUser();
    if (error) return null;

    if (data) {
        return data.user
    }
}