import crypto, { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
const { CIPHER_ALGORITHM, NODE_ENV } = process.env;

const scryptAsync = promisify<string, string, number, Buffer>(scrypt);

const cipherAlgorithm = CIPHER_ALGORITHM;
const cipherPassword = NODE_ENV || 'staging';

export class Encrypt {
    static async toHash(data: string) {
        const salt = randomBytes(16).toString('hex');
        const buffer = await scryptAsync(data, salt, 64);

        return `${buffer.toString('hex')}.${salt}`;
    }

    static async compare(storedData: string, suppliedData: string) {
        const [hashedData, salt] = storedData.split('.');
        const buffer = await scryptAsync(suppliedData, salt, 64);

        return buffer.toString('hex') === hashedData;
    }

    static encode(data: string) {
        // Get the cipher key and IV from the password
        const key = Buffer.from(cipherPassword, 'utf-8');
        const iv = crypto.randomBytes(16);

        // Create ciphering instance using createCipheriv
        const cipher = crypto.createCipheriv(cipherAlgorithm!, key, iv);

        // Cipher the Auth Header
        let cipheredData = cipher.update(data, 'utf-8', 'hex');
        cipheredData += cipher.final('hex');

        // Compute and return the base64 encoded ciphered authHeader with IV prepended
        const encryptedData = Buffer.concat([iv, Buffer.from(cipheredData, 'hex')]);
        return encryptedData.toString('base64');
    }

    static decode(data: string) {
        // The ciphered AuthHeader is a base64 encoded string
        // Create hex format buffer with the decoded text
        const decodedBuffer = Buffer.from(data, 'base64').toString('hex');

        // Extract IV from the decoded buffer (assuming IV is the first 16 bytes)
        const iv = Buffer.from(decodedBuffer.slice(0, 32), 'hex');
        const encryptedData = Buffer.from(decodedBuffer.slice(32), 'hex');

        // Create deciphering instance using createDecipheriv
        const decipher = crypto.createDecipheriv(cipherAlgorithm!, Buffer.from(cipherPassword, 'utf-8'), iv);

        // Decipher the string and return the auth header obtained
        let decryptedAuthHeader = decipher.update(encryptedData.toString('hex'), 'hex', 'utf-8');
        decryptedAuthHeader += decipher.final('utf-8');

        return decryptedAuthHeader;
    }
}
