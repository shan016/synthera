import { getCurrentUser, updateProfile } from "@/lib/actions/auth.action";
import { deleteFile, uploadFile } from "@/lib/r2";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
    const user = await getCurrentUser();

    if (!user) return Response.json({
        success: false,
        message: 'Unauthorized.'
    })

    const data: updateProfile = {};

    const formData = await request.formData();
    const file = formData.get('profilePhoto') as File;

    if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileExt = file.name.split('.').pop();
        const filePath = `profile/${user.email}/${randomUUID()}.${fileExt}`;

        if (user.avatar) {
            await deleteFile(user.avatar);
        }
        const response = await uploadFile(filePath, file);

        if (!response.success) return Response.json({
            success: false
        })
        
        data['avatar'] = filePath;
    }

    if (formData.get('name')) {
        data['name'] = formData.get('name') as string;
    }
    if (formData.get('email')) {
        data['email'] = formData.get('email') as string;
    }
    if (formData.get('password')) {
        data['password'] = formData.get('password') as string;
    }

    const response = await updateProfile(user.id, data);
    return Response.json({
        success: true
    })
}