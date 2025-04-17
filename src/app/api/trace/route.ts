import { getCurrentUser, updateProfile } from "@/lib/actions/auth.action";
import { getLocation, getWorkHistory } from "@/lib/trace";

export async function POST(request: Request) {
    const formData = await request.formData();
    const nric = formData.get('nric') as string;
    if (!nric) return Response.json({
        success: false,
        message: 'No NRIC provided.'
    })

    const user = await getCurrentUser();
    if (!user || user?.balance && user.balance <= 0 || !user.balance) {
        return Response.json({
            success: false,
            message: `You're not authorized to do this action. Your request quota is empty.`
        });
    }


    const records: records = {};
    const location = await getLocation(nric);
    if (location) {
        records['name'] = location['nama'];
        records['serviceNo'] = location['noPerkhidmatan'];
        records['sex'] = location['jantina'] === 'LELAKI' ? 'male' : 'female';
        records['nric'] = location['noKp'];
        let addr = `${location['lokaliti']}, ${location['dun']}, ${location['parlimen']}, ${location['negeri']}`
        records['location'] = addr;
        records['dob'] = location['tarikhLahir']
        const works = await getWorkHistory(nric);
        const history: Work[] = [];
        works?.forEach(x => {
            const data: Work = {
                employer: x['EMPLOYERNAME'] || '',
                industry: x['INDUSTRYNAME'] || '',
                startDate: x['EMPLOYMENTSTARTDATE'] || '',
                address: `${x['ASSISTADDR1'] || ''}, ${x['ASSISTADDR2'] || ''}, ${x['ASSISTADDR3'] || ''}`.replaceAll(',,', ',')
            }
            history.push(data);
        })
        records['history'] = history;

        records.balance = user.balance - 1;
        await updateProfile(user.id, {
            balance: user.balance - 1
        })
        return Response.json(records);
    }
    return Response.json({
        success: false,
        message: 'No data.'
    })
}