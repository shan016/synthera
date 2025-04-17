"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { getFileUrl } from "../r2";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams): Promise<AuthMessage> {
    const { uid, name, email, password } = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists. Please sign in instead.'
            }
        }

        await db.collection('users').doc(uid).set({
            name, email, password, role: 'user'
        });

        return {
            success: true,
            message: 'Account created successfully. Please sign in.'
        }
    } catch (e: any) {
        // console.error(`Error creating user: ${e}`);

        if (e.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: `This email is already in use.`
            }
        }

        return {
            success: false,
            message: 'Failed to create an account.'
        }
    }
}

export async function signIn(params: SignInParams): Promise<AuthMessage> {
    const { idToken, email } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: 'User does not exist. Create an account instead.'
            }
        }

        await setSessionCookie(idToken);

        return {
            success: true,
            message: `Sign in successfully.`
        }
    } catch (e) {
        console.error(e);

        return {
            success: false,
            message: 'Failed to log into an account.'
        }
    }
}

export async function setSessionCookie(idtoken: string): Promise<undefined> {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idtoken, {
        expiresIn: ONE_WEEK * 1000,
    });

    cookieStore.set('session', sessionCookie, {
        httpOnly: true,
        maxAge: ONE_WEEK,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    })
}

export async function getCurrentUser(): Promise<User | null>{
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if (!userRecord.exists) return null;

        const data = userRecord.data();
        if (data && !data.profilePhoto && data.avatar) {
            const response = await getFileUrl(data.avatar);
            const expiryTime = Date.now() + 60 * 60 * 1000;
            await db.collection('users').doc(decodedClaims.uid).update({
                profilePhoto: {
                    expiryTime,
                    url: response
                }
            })

            return {
                ...userRecord.data(),
                id: userRecord.id,
                profilePhoto: {
                    expiryTime,
                    url: response
                }
            } as User;
        }

        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    } catch (e) {
        // console.error(e);
        return null;
    }
}

export async function isAuthenticated(): Promise<Boolean> {
    const user = await getCurrentUser();

    return !!user;
}

export async function getUserPayments(userId: string | undefined, month?: number, year?: number): Promise<UploadRecords[] | null> {
    try {
        const userRef = await getCurrentUser();
        if (!userRef) return null;

        let q = db.collection('payments').where('userId', '==', userRef.id);

        if (month) {
            q = q.where('month', '==', month);
        }

        if (year) {
            q = q.where('year', '==', year);
        }

        const snapshot = await q.get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as Omit<UploadRecords, 'id'>
        }))
    } catch (err) {
        // console.error('Error fetching user uploads:', err);
        throw new Error('Failed to get user uploads.');
    }
}

export async function updateProfile(userId: string, data: updateProfile) {
    const user = await db.collection('users').doc(userId).update({ ...data });
    return user;
}

export async function deleteCookie(id: string) {
    const cookieStore = await cookies();
    return cookieStore.delete(id);
}