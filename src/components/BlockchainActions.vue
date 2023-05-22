<template>
  <div class="blockchain_actions">
    <ui-button
      v-for="(action, idx) in Object.values(ACTIONS)"
      :key="idx"
      :text="action"
      @click="actionClick"
    />
  </div>
</template>

<script lang="js" setup>
import UiButton from "./ui/UiButton.vue";
import { useBlockchainStore } from '@/store'

const blockchainStore = useBlockchainStore();

const ACTIONS = {
  generateAccount: 'Generate account',
  createBlock: 'Create block',
  validateBlock: 'Validate block'
}

const actionClick = async (action) => {
  if(action === ACTIONS.generateAccount) {
    await blockchainStore.generateAccount()
    return
  }
  if(action === ACTIONS.createBlock) {
    await blockchainStore.createBlock()
    return
  }
  if(action === ACTIONS.validateBlock) {
    await blockchainStore.validateBlock()
  }
}

</script>

<style lang="scss" scoped>
.blockchain_actions {
  display: flex;
  gap: toRem(10);
}
</style>
