import { Block } from '@/core'

export class Blockchain {
    constructor() {
        this.coinDatabase = {};
        this.blockHistory = [];
        this.txDatabase = [];
    }

    initBlockchain() {
        const genesisBlock = new Block('0', []);
        genesisBlock.calculateBlockID();
        this.blockHistory.push(genesisBlock);
    }

    getTokenFromFaucet(account, coinsCount) {
        this.coinDatabase[account.accountID] = coinsCount;
        account.updateBalance(coinsCount);
    }

    async validateBlock(block) {
        const prevBlock = this.blockHistory[this.blockHistory.length - 1];
        if (block.prevHash !== prevBlock.blockID) {
            throw new Error('Invalid block');
        }

        for (const transaction of block.setOfTransactions) {
            if (this.txDatabase.includes(transaction.transactionID)) {
                throw new Error('Duplicate transaction');
            }

            const firstOperationSender = transaction.setOfOperations[0].sender;
            for (const operation of transaction.setOfOperations) {
                if (operation.sender !== firstOperationSender) {
                    throw new Error('Invalid operation in transaction');
                }

                if (!(await operation.verifyOperation())) {
                    throw new Error('Invalid operation in transaction');
                }
            }
        }

        // If all operations are valid, update the balances and add the transaction to the database
        for (const transaction of block.setOfTransactions) {
            for (const operation of transaction.setOfOperations) {
                operation.sender.updateBalance(-operation.amount);
                operation.receiver.updateBalance(operation.amount);
            }
            this.txDatabase.push(transaction.transactionID);
        }

        this.blockHistory.push(block);
    }

    getAccountBalances(...accounts) {
        accounts.forEach(account => {
            console.log(`Account ID: ${account.accountID}, Balance: ${account.balance}`)
        })
    }
}
