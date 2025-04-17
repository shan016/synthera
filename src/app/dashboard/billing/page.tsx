import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getCurrentUser, getUserPayments } from "@/lib/actions/auth.action";

const Page = async () => {
    const user = await getCurrentUser();
    const payments = await getUserPayments(user?.id);
    return (
        <div className="p-2 m-4">
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-lg">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                {payments?.map((x, index) => (
                    <TableBody key={index}>
                        <TableRow>
                            <TableCell className="font-medium">{x.invoiceNumber}</TableCell>
                            <TableCell>{x.verified ? 'Paid' : x.reason ? 'Rejected' : 'Pending'}</TableCell>
                            <TableCell>{x.updatedAt.toDate().toLocaleString()}</TableCell>
                            <TableCell className="text-right">{x.amount}</TableCell>
                        </TableRow>
                    </TableBody>
                ))}
            </Table>
        </div>
    )
}

export default Page;