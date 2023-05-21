

export class Transaction {
    constructor(setOfOperations, transactionID) {
        this.setOfOperations = setOfOperations;
        this.transactionID = transactionID;
    }

    async signTransaction() {
        for (const operation of this.setOfOperations) {
            await operation.signOperation();
        }
    }

    toString() {
        return JSON.stringify(this);
    }

    printTransaction() {
        console.log(this.toString());
    }
}
