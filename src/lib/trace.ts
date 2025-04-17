import * as crypto from "crypto";

const algorithm = 'aes-256-cbc'; // AES algorithm with CBC mode
const key = Buffer.from('99bffbc04b6de1950481c9049a16f6d6', 'utf8'); // 256-bit key
const iv = Buffer.from('84bc03b051662372', 'utf8'); // 128-bit IV

async function encryptToBase64(text: string) {
    // Create a cipher object
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    // Encrypt the data
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

async function decrypt(base64Ciphertext: string) {
    // Create a decipher object
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    // Decrypt the Base64-encoded ciphertext
    let decrypted = decipher.update(base64Ciphertext, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

async function encrypt(nric: string) {
    if (!nric) return;
    let data = `1741491943471.bc4246bef5305af0.${nric}`;
    return encryptToBase64(data);
}
export const getLocation = async (nric: string) => {
    const data = await encrypt(nric);

    const url = "https://mysprsemakapi.spr.gov.my/api/Semakan/DaftarPemilih";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Dart/3.4 (dart:io)",
                "Accept-Encoding": "gzip",
                "Host": "mysprsemakapi.spr.gov.my"
            },
            body: JSON.stringify({ "ictentera": data }),
            // agent: new (require("https").Agent)({ rejectUnauthorized: false }) // Sama macam httpsAgent dalam axios
        });

        const result = await response.json();

        if (result.status !== "else") return;
        return result?.detail?.dpi;
    } catch (error) {
        // console.error(error.stack);
        return;
    }
}

export const getWorkHistory = async (nric: string): Promise<undefined | eis[]> => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const url = `https://eis.perkeso.gov.my/eisportal/insured/appl/isEligible?newIc=${nric}&idNo=`
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': '	Mozilla/5.0 (X11; Linux x86_64; rv:136.1) Gecko/20100122 Firefox/137.0'
            },
        });

        const result = await response.json();
        return result
    } catch (error) {
        console.error(error)
        return;
    }
}