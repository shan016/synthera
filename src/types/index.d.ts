interface SignUpParams {
    uid: string;
    name: string;
    email: string;
    password: string;
}

interface SignInParams {
    idToken: string;
    email: string;
}

interface profilePhoto {
    expiryTime: number;
    url: string;
}

interface User {
    email: string;
    name: string;
    id: string;
    role: 'user' | 'admin';
    plan?: string;
    avatar?: string;
    profilePhoto?: profilePhoto;
    balance?: number;
}

interface AuthMessage {
    success: boolean;
    message: string;
}

interface PricingPlan {
    title: string;
    description: string;
    details: string[];
    price?: string;
    tag: string;
}

interface UploadRecords {
    id: string;
    r2Key: string;
    originalFilename: string;
    fileType: string;
    fileSize: number;
    userId: string;
    month: number;
    year: number;
    createdAt: FieldValue;
    updatedAt: FieldValue;
    status: 'uploading' | 'completed' | 'failed';
    metadata: {
        description: string;
        tags?: string[];
    },
    verified: boolean;
    reason?: string;
    invoiceNumber: string;
    amount: string;
}

declare namespace NodeJS {
    export interface ProcessEnv {
        R2_ACCESS_KEY_ID: string;
        R2_SECRET_ACCESS_KEY: string;
        R2_ENDPOINTS: string;
        R2_NEXT_PUBLIC_API_URL: string;
        BUCKET_NAME: string;
        MAILGUN_DOMAIN: string;
        MAILGUN_APIKEY: string;
    }
}

interface Work {
    employer: string;
    industry: string;
    startDate: string;
    address: string;
}

interface records {
    name?: string;
    dob?: string;
    serviceNo?: string | null;
    sex?: 'male' | 'female';
    location?: string;
    nric?: string;
    history?: Work[];
    balance?: number;
}

interface eis {
    EMPLOYEEID: number | null;
    NAME: string;
    DOB: string | null;
    EMPLOYERID: number | null;
    EMPLOYERCODE: string | null;
    EMPLOYERNAME: string | null;
    INDUSTRYID: number | null;
    INDUSTRYNAME: string | null;
    EMPLOYMENTSTARTDATE: string | null;
    EMPLOYMENTINFOID: string | null;
    PAID_CONTRIBUTION_COUNT: number | null;
    ASSISTADDR1: string | null;
    ASSISTADDR2: string | null;
    ASSISTADDR3: string | null;
    ASSISTCOUNTRYID: string | null;
    ASSISTSTATEID: string | null;
    ASSISTCITYID: string | null;
    ASSISTPOSTCODE: string | null;
}

interface updateProfile {
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
    proflePhoto?: profilePhoto;
    balance?: number;
}

interface link {
    title?: string;
    description?: string;
    label?: string;
    href?: string;
    icon?: any;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null;
}

interface section {
    title: string;
    description: string;
    items?: link[]
}

interface ResponseApi {
    success: boolean;
    message: string;
}