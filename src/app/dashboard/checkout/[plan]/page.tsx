import PaymentForm from "@/components/PaymentForm";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async ({ params }: { params: Promise<{ plan: string }> }) => {
    const { plan } = await params;
    const user = await getCurrentUser();

    return (
        <div>
            <PaymentForm plan={plan} user={user}/>
        </div>
    );
}

export default Page;