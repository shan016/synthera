import { AwsClient } from 'aws4fetch'

const client = new AwsClient({
    service: 's3',
    region: 'auto',
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
})

const R2_URL = process.env.R2_ENDPOINTS;
const BUCKET_NAME = process.env.BUCKET_NAME;


/**
 * Generate presigned URL for uploading
 * @param filePath - Path of the file in R2
 * @param expiresIn - Expiration time in seconds (default: 1 hour)
 * @returns Presigned URL
 */
export async function getFileUrl(filePath: string): Promise<string> {
    const url = `${R2_URL}/${BUCKET_NAME}/${filePath}`;
    const signedRequest = await client.sign(new Request(url, { method: 'GET' }), {
        aws: { signQuery: true }
    });

    return signedRequest.url.toString();
}

/**
 * Upload file to Cloudflare R2
 * @param filePath - Path of the file in R2
 * @param file - File data (Buffer | Blob)
 */
export async function uploadFile(filePath: string, file: Buffer | Blob): Promise<{ success: boolean, message?: string, status: string, url?: string }> {
    const url = `${R2_URL}/${BUCKET_NAME}/${filePath}`;
    const signedRequest = await client.sign(new Request(url, { method: 'PUT' }), {
        aws: { signQuery: true }
    });

    const response = await fetch(signedRequest.url, { method: 'PUT', body: file });
    if (!response.ok) return { success: false, message: await response.text(), status: response.statusText }

    return { success: true, url, status: response.statusText }
}

/**
 * Delete file from Cloudflare R2
 * @param filePath - Path of the file in R2_URL
 */
export async function deleteFile(filePath: string): Promise<{ success: boolean, status?: string }> {
    const url = `${R2_URL}/${BUCKET_NAME}/${filePath}`;
    const signedRequest = await client.sign(new Request(url, { method: 'DELETE' }));
    
    const response = await fetch(signedRequest.url, { method: 'DELETE' });
    if (!response.ok) return { success: false, status: response.statusText }

    return { success: true }
}

/**
 * Generate presigned URL for downloading
 * @param filePath - Path of the file in R2
 * @param expiresIn - Expiration time in seconds (default: 1 hour)
 * @returns Presigned URL
 */
export async function getDownloadUrl(filePath: string, expiresIn: number = 3600): Promise<string> {
    const url = `${R2_URL}/${BUCKET_NAME}/${filePath}`;
    const signedRequest = await client.sign(new Request(url), {
        aws: { signQuery: true }
    });

    return signedRequest.url.toString();
}