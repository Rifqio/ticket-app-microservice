import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify<string, string, number, Buffer>(scrypt);

export class Encrypt {
    static async toHash(data: string) {
        const salt = randomBytes(8).toString('hex');
        const buffer = await scryptAsync(data, salt, 64);

        return `${buffer.toString('hex')}.${salt}`;
    }

    static async compare(storedData: string, suppliedData: string) {
        const [hashedData, salt] = storedData.split('.');
        const buffer = await scryptAsync(suppliedData, salt, 64);

        return buffer.toString('hex') === hashedData
    }

    print() {}
}
