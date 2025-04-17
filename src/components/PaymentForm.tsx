"use client"

import { config, pricing } from "@/constants";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const VALID_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

const PaymentForm = ({ plan, user }: { plan: string, user: User | null }) => {
    const item = pricing.find(x => x.tag === plan);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const uploadedFile = event.target.files?.[0];
        if (!uploadedFile) return;

        setError(null);

        if (!VALID_FILE_TYPES.includes(uploadedFile.type)) {
            setError(`Invalid file type. Only JPEG, PNG or PDF are allowed.`);
            return;
        }

        if (uploadedFile.size > MAX_FILE_SIZE) {
            setError('File size is too large. Max size is 5MB.')
        }
        setFile(uploadedFile);
    }
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!file) {
            toast.error('Please upload a proof payment.');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('proof', file);
            formData.append('amount', item?.price || 'custom')

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Upload failed.');

            toast.success('File uploaded successfully.');
            router.push('/dashboard');
        } catch (e) {
            setError('An error occurred during upload. Please try again.');
            toast.error('Upload failed.');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="border-1 rounded-2xl p-4 m-4">
            <h2 className="font-extrabold text-2xl">Payment for <span className="text-muted-foreground">{item?.title}</span></h2>
            <div className="flex flex-col gap-2 m-2 justify-center">
                <span className="text-sm text-muted-foreground">Payment should be made to the wallet below:</span>
                <p>Bank Name: <span className="font-bold">{config.bankName}</span></p>
                <p>Account No.: <span className="font-bold">{config.bankAcc}</span></p>
                <Image src="/images/qr.jpeg" alt="Wallet" width={300} height={300} />
                {/* <span className="overflow-x-hidden">{config.wallet}</span> */}
            </div>

            <div className="flex justify-between items-center py-3">
                <h3>Amount:</h3>
                <span className="font-bold">{item?.price}</span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-3 my-4">
                    <Label htmlFor="picture">Upload Proof of Payment</Label>
                    <Input id="proof" type="file" onChange={handleChange} accept={VALID_FILE_TYPES.join(',')} />
                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}
                </div>
                <Button
                    type="submit"
                    className="mt-4"
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Submit'}
                </Button>
            </form>
        </div>
    );
}

export default PaymentForm;