class Crypt {
    // 加密
    static async encrypt(data: string, key: string, iv: Uint8Array): Promise<string> {
        const algorithm = { name: 'AES-CBC', iv };
        const encodedData = new TextEncoder().encode(data);
        const cryptoKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(key), { name: 'AES-CBC', length: 128 }, false, [
            'encrypt',
        ]);
        const encryptedData = await crypto.subtle.encrypt(algorithm, cryptoKey, encodedData);
        const encryptedArray = new Uint8Array(encryptedData);
        const encryptedString = Array.from(encryptedArray, (byte) => ('0' + byte.toString(16)).slice(-2)).join('');
        return encryptedString;
    }

    // 解密
    static async decrypt(encryptedData: string, key: string, iv: Uint8Array): Promise<string> {
        const algorithm = { name: 'AES-CBC', iv };
        const encryptedArray = new Uint8Array(encryptedData.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
        const cryptoKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(key), { name: 'AES-CBC', length: 128 }, false, [
            'decrypt',
        ]);

        try {
            const decryptedData = await crypto.subtle.decrypt(algorithm, cryptoKey, encryptedArray);
            const decryptedString = new TextDecoder().decode(decryptedData);
            return decryptedString;
        } catch (error) {
            return 'error';
        }
    }
}

// 创建128位的随机字符串
const iv = new Uint8Array([237, 127, 1, 68, 168, 213, 222, 12, 234, 171, 239, 71, 135, 235, 226, 7]);
const key = '12dhA+o.56';
