const DOMAIN = process.env.MAILGUN_DOMAIN;
const APIKEY = process.env.MAILGUN_APIKEY;

export const sendMail = async (from: string, to: string, subject: string, text?: string, html?: string, attachment?: File[]) => {
    const data = new FormData();
    data.append('from', from);
    data.append('to', to);
    data.append('subject', subject);
    text && data.append('text', text);
    html && data.append('html', html);
    if (attachment) {
        for (let i=0;i<attachment.length;i++) {
            data.append('attachment', attachment[i]);
        }
    }

    const url = `https://api.mailgun.net/v3/${DOMAIN}/messages`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`api:${APIKEY}`).toString('base64')}`,
            },
            body: data
        });

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
    }
}