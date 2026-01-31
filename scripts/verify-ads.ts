import fs from 'fs';
import path from 'path';
import https from 'https';

const ADS_TXT_PATH = path.join(process.cwd(), 'public', 'ads.txt');
const EXPECTED_CONTENT = "google.com, pub-5099892029462046, DIRECT, f08c47fec0942fa0";
const PRODUCTION_URL = "https://ageinfo.online/ads.txt";

async function verifyAdsTxt() {
    console.log("🔍 Starting ads.txt Verification...\n");

    // 1. Local File Check
    try {
        if (!fs.existsSync(ADS_TXT_PATH)) {
            throw new Error(`❌ Local file not found at: ${ADS_TXT_PATH}`);
        }
        const content = fs.readFileSync(ADS_TXT_PATH, 'utf-8').trim();
        if (content !== EXPECTED_CONTENT) {
            throw new Error(`❌ Local content mismatch.\nExpected: ${EXPECTED_CONTENT}\nFound: ${content}`);
        }
        console.log("✅ Local ads.txt is present and correct.");
    } catch (error: any) {
        console.error(error.message);
        process.exit(1);
    }

    // 2. Production URL Reachability Check
    // (Note: This will only pass if the site is already deployed, but useful for post-deployment verification)
    console.log(`\n🌍 Checking live availability at ${PRODUCTION_URL}...`);

    const checkUrl = (url: string) => {
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                if (res.statusCode === 200) {
                    let data = '';
                    res.on('data', (chunk) => data += chunk);
                    res.on('end', () => {
                        if (data.trim() === EXPECTED_CONTENT) {
                            resolve("✅ Live ads.txt is accessible and correct.");
                        } else {
                            reject(`❌ Live content mismatch.\nFound: ${data.trim().substring(0, 50)}...`);
                        }
                    });
                } else {
                    reject(`❌ HTTP Error: ${res.statusCode}`);
                }
            }).on('error', (e) => reject(`❌ Network Error: ${e.message}`));
        });
    };

    try {
        const result = await checkUrl(PRODUCTION_URL);
        console.log(result);
    } catch (error) {
        console.warn(`⚠️  Live check failed (Expected if localhost/not deployed yet): ${error}`);
        console.log("👉 Ensure you deploy the 'public' folder changes.");
    }
}

verifyAdsTxt();
