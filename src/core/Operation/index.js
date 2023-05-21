import { Signature } from '@/core'

export class Operation {
    constructor(sender, receiver, amount, nonce) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.nonce = nonce;
    }

    async verifyOperation() {
        try {
            const message = `${this.sender.accountID}${this.receiver.accountID}${this.amount}${this.nonce}`;
            const signatureValid = await Signature.verifySignature(this.sender.wallet.publicKey, message, this.signature);
            return signatureValid && this.sender.balance >= this.amount;
        } catch (e) {
            console.log('Can\'t sign block')
        }
    }

    async signOperation() {
        const message = `${this.sender.accountID}${this.receiver.accountID}${this.amount}${this.nonce}`;
        this.signature = await Signature.signData(this.sender.wallet.privateKey, message);
    }
}
