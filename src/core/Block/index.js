import CryptoJS from 'crypto-js';
import { Hash } from '@/core'

export class Block {
    constructor(prevHash, setOfTransactions) {
        this.blockID = undefined;
        this.prevHash = prevHash;
        this.setOfTransactions = setOfTransactions;
    }

    calculateBlockID() {
        this.blockID = CryptoJS.SHA1(`${this.prevHash}${JSON.stringify(this.setOfTransactions)}`).toString();
    }
}
