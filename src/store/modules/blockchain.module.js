import { defineStore } from 'pinia'
import { Blockchain, Account, Block } from '@/core'

export const useBlockchainStore = defineStore('auth', {
    state: () => ({
        _blockchain: new Blockchain(),
        _accounts: [],
        _transactions: [],
        _currentBlock: null,
    }),
    persist: true,
    actions: {

        getTokensFromFaucet(account, tokensCount) {
            this._blockchain.getTokensFromFaucet(account, tokensCount)
        },
        addTransactionToBlock(transaction) {
          this._transactions.push(transaction)
        },
        async generateAccount() {
            try {
                const generatedAccount = await Account.genAccount()
                this._accounts.push(generatedAccount)
                return generatedAccount
            } catch (e) {
                console.log(e)
            }
        },
        async createBlock() {
            this._currentBlock = null
            this._currentBlock = new Block(
                this._blockchain.blockHistory[this._blockchain.blockHistory.length - 1].blockID,
                this._transactions
            );
            await this._currentBlock.calculateBlockID();
        },
        async validateBlock() {
            await this._blockchain.validateBlock(this._currentBlock);
            this._transactions = []
            this._currentBlock = null
        },
        async initBlockchain() {
            await this._blockchain.initBlockchain();
        }
    },
    getters: {
        blockchain: state => state._blockchain,
        accounts: state => state._accounts,
        currentBlock: state => state._currentBlock
    }
})
