import CryptoJS from 'crypto-js';
import { ethers, Wallet } from 'ethers'

export class Signature {
    static async verifySignature(publicKey, message, signature) {
        const address = ethers.computeAddress(publicKey);
        const verified = ethers.verifyMessage(message, signature);
        return (verified.toLowerCase() === address.toLowerCase());
    }

    static async signData(privateKey, message) {
        const wallet = new Wallet(privateKey);
        const signature = await wallet.signMessage(message);
        return signature
    }

    toString() {
        return JSON.stringify(this);
    }

    printSignature() {
        console.log(this.toString());
    }
}
