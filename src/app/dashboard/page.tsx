import { TraceForm } from "@/components/TraceForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricing, routes } from "@/constants";
import { getCurrentUser, getUserPayments } from "@/lib/actions/auth.action";
import { Check } from "lucide-react";
import Link from "next/link";

const Page = async () => {
    const userRecord = await getCurrentUser();
    const payments = await getUserPayments(userRecord?.id);
    const latestPayment = payments?.slice(-1)[0]

    if (!userRecord?.balance || userRecord.balance === 0) {
        return (
            <div className="flex flex-col m-4">
                <div className="flex flex-col my-4">
                    <h1 className="text-2xl font-semibold">Hai, {userRecord?.name}!</h1>
                    {payments?.[0] && !latestPayment?.verified ?
                        (
                            <div>
                                <span className="text-muted-foreground">Pembayaran anda sedang diproses. <Link href={routes.billing} className="text-primary font-bold">Lihat di sini</Link></span>
                            </div>
                        ) :
                        (
                            <div>
                                <span className="text-muted-foreground">Anda tiada baki kredit. Sila tambah nilai untuk meneruskan carian.</span>
                                <div className="flex flex-col md:grid md:grid-cols-3 gap-4 my-3">
                                    {pricing.map((x, index) => (
                                        <Card key={index} className="m-2 hover:border-primary active:scale-95 transition shadow">
                                            <CardHeader>
                                                <CardTitle className="text-2xl">{x.title}</CardTitle>
                                                <CardDescription>{x.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex mb-5 items-end gap-2">
                                                    <h1 className="text-3xl">{x.price || 'Harga ikut permintaan'}</h1>
                                                </div>
                                                <ul className="space-y-1">
                                                    {x.details.map((item, idx) => (
                                                        <li key={idx} className="flex gap-2 items-start">
                                                            <Check className="mt-1 w-4 h-4 text-green-600" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                            <CardFooter>
                                                <Link href={routes[x.tag]} className="w-full">
                                                    <Button className="w-full">
                                                        Pilih Pelan
                                                    </Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
    return <TraceForm credits={userRecord?.balance || 0} />
}

export default Page;
