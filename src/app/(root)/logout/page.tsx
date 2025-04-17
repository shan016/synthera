import { auth } from "@/firebase/client";
import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";

const Page = async () => {
    await signOut(auth);
    return redirect('/');
}

export default Page;