<template>
 <main class="main">
   <h2 class="main__title">
     Blockchain History
   </h2>
   <div class="main__blocks-history">
     <BlockchainBlock
         v-for="(block, idx) in blockHistory"
         :key="idx"
         :blockID="block.blockID"
         :prevHash="block.prevHash"
         :setOfTransactions="block.setOfTransactions"
         :blockNumber="idx"
     />
   </div>
   <div class="main__actions-wrapper">
     <div class="main__actions">
       <h2 class="main__title">
         Blockchain actions
       </h2>
       <BlockchainActions />
     </div>
     <div class="main__accounts">
       <h2 class="main__title">
         Blockchain accounts
       </h2>
       <BlockchainAccounts />
     </div>
   </div>
 </main>
</template>

<script lang="js" setup>
import BlockchainActions from './BlockchainActions.vue'
import BlockchainBlock from '@/components/BlockchainBlock.vue'
import BlockchainAccounts from './BlockchainAccounts.vue'
import { useBlockchainStore } from '@/store'
import { Account, Transaction, Block } from '@/core'
import { computed } from 'vue'

const blockchainStore = useBlockchainStore();

const blockHistory = computed(() => blockchainStore.blockchain.blockHistory)

async function initBlockchain() {
  await blockchainStore.initBlockchain();
}

initBlockchain()
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  padding: toRem(20);
}

.main__title {
  margin-bottom: toRem(10);
}

.main__blocks-history {
  width: calc(100vw - #{toRem(40)});
  overflow-y: auto;
  display: flex;
  gap: toRem(10);
  padding-bottom: toRem(10);
}

.main__actions-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: toRem(50);
}

.main__actions {
  padding-bottom: toRem(10);
}
</style>
