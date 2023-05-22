<template>
  <div class="blockchain-accounts">
    <BlockchainAccount
        v-for="(account, idx) in blockchainStore.accounts"
        :key="idx"
        :account="account"
    />
  </div>
</template>

<script lang="js" setup>
import BlockchainAccount from "./BlockchainAccount.vue";
import { useBlockchainStore } from '@/store'

const blockchainStore = useBlockchainStore();
</script>

<style lang="scss" scoped>
.blockchain-accounts {
  display: flex;
  flex-direction: column;
  gap: toRem(20);
}
</style>
