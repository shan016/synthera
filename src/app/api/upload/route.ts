import { db } from "@/firebase/admin";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { sendMail } from "@/lib/mail";
import { uploadFile } from "@/lib/r2";
import { randomUUID } from "crypto";
import { FieldValue } from "firebase-admin/firestore";

// Helper function to generate invoice number
function generateInvoiceNumber(userId: string, month: number, year: number): string {
  const timestamp = Date.now().toString().slice(-6);
  const userCode = userId.slice(0, 4).toUpperCase();
  return `INV-${year}${month.toString().padStart(2, '0')}-${userCode}-${timestamp}`;
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('proof') as File;
        const amount = formData.get('amount') as string;

        if (!file) {
            return Response.json(
                { success: false, message: 'No file provided.' },
                { status: 400 }
            );
        }

        const now = new Date();
        const user = await getCurrentUser();

        if (!user) {
            return Response.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Generate invoice number
        const invoiceNumber = generateInvoiceNumber(
            user.id,
            now.getMonth() + 1,
            now.getFullYear()
        );

        // Prepare file upload
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileExt = file.name.split('.').pop();
        const r2Key = `payments/${user.email}/${randomUUID()}.${fileExt}`;

        // Create payment record with initial status
        const paymentData = {
            r2Key,
            originalFilename: file.name,
            fileType: file.type,
            fileSize: file.size,
            userId: user.id,
            userEmail: user.email,
            month: now.getMonth() + 1,
            year: now.getFullYear(),
            invoiceNumber,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
            status: 'uploading',
            verified: false,
            amount
        };

        const uploadRef = await db.collection('payments').add(paymentData);

        try {
            // Upload file to storage
            const response = await uploadFile(r2Key, buffer);

            // Hardcoded sebab malas
            const message = `Payment ${amount} has been made from ${user.email} a.k.a ${user.name}`
            await sendMail('payment@mip.org.my', 'mirulhxm0935@gmail.com', `Payment File Upload #${invoiceNumber}`, message, undefined, [file]);
            
            if (response.success) {
                await uploadRef.update({
                    status: 'completed',
                    updatedAt: FieldValue.serverTimestamp()
                });
                return Response.json({
                    ...response,
                    invoiceNumber,
                    paymentId: uploadRef.id
                });
            }

            // Handle upload failure
            await uploadRef.update({
                status: 'failed',
                updatedAt: FieldValue.serverTimestamp(),
                error: 'Upload failed'
            });
            
            return Response.json(
                { success: false, error: 'Upload failed' },
                { status: 500 }
            );
            
        } catch (uploadError) {
            console.error("Upload error:", uploadError);
            await uploadRef.update({
                status: 'failed',
                updatedAt: FieldValue.serverTimestamp(),
                error: uploadError instanceof Error ? uploadError.message : 'Unknown upload error'
            });
            
            return Response.json(
                { success: false, error: 'File upload failed' },
                { status: 500 }
            );
        }
        
    } catch (error) {
        console.error("Error processing payment:", error);
        return Response.json(
            { 
                success: false, 
                error: error instanceof Error ? error.message : 'Internal server error' 
            },
            { status: 500 }
        );
    }
}