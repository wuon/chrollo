import fs from 'fs';
import crypto from 'crypto';

export const validateFileHash = (fileName: string, hash: string) =>
  new Promise<boolean>((resolve) => {
    const [algo, checkHex] = hash.split(':');
    const fileBuffer = fs.readFileSync(fileName);
    const hashSum = crypto.createHash(algo);
    hashSum.update(fileBuffer);

    const hex = hashSum.digest('hex');
    setTimeout(() => resolve(checkHex === hex), 1000);
  });
