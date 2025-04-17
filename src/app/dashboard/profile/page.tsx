import { ProfileForm } from "@/components/ProfileForm";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
    const user = await getCurrentUser();
    return <ProfileForm user={user}/>
}

export default Page;