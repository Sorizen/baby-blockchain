import CryptoJS from 'crypto-js';

export class KeyPair {
    constructor(privateKey, publicKey) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }

    static genKeyPair() {
        const privateKey = CryptoJS.lib.WordArray.random(16).toString();
        const publicKey = CryptoJS.lib.WordArray.random(16).toString();

        return new KeyPair(privateKey, publicKey);
    }

    toString() {
        return JSON.stringify(this);
    }

    printKeyPair() {
        console.log(this.toString());
    }
}
