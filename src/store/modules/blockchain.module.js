import { defineStore } from 'pinia'
import { Blockchain } from '@/core'

export const useBlockchainStore = defineStore('auth', {
    state: () => ({
        _blockchain: new Blockchain()
    }),
    persist: true,
    actions: {
        async initBlockchain() {
            await this._blockchain.initBlockchain();
        }
    },
})
