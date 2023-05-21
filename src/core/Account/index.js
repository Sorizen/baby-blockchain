import CryptoJS from 'crypto-js';
import { Wallet } from "ethers";
import { KeyPair, Operation } from '@/core'

export class Account {
    constructor(accountID, balance, wallet) {
        this.accountID = accountID;
        this.wallet = wallet;
        this.balance = balance;
    }

    static async genAccount() {
        const wallet = Wallet.createRandom();

        const privateKey = wallet.privateKey;
        const publicKey = wallet.publicKey;

        return new Account(privateKey, 0, { publicKey, privateKey });
    }

    updateBalance(amount) {
        this.balance += amount;
    }

    printBalance() {
        console.log(`Account ID: ${this.accountID}, Balance: ${this.balance}`);
    }

    createPaymentOp(receiver, amount, nonce) {
        return new Operation(this, receiver, amount, nonce);
    }
}
