<template>
  <div class="block-transaction">
    <div class="block-transaction__text-wrapper">
      <span class="block-transaction__text">
        Transaction Number: {{ transactionNumber }}
      </span>
    </div>
    <div class="block-transaction__text-wrapper">
      <span class="block-transaction__text">
        From: {{ sender }}
      </span>
    </div>
    <div class="block-transaction__text-wrapper">
      <span class="block-transaction__text">
        To: {{ receiver }}
      </span>
    </div>
    <div class="block-transaction__text-wrapper">
      <span class="block-transaction__text">
        Amount: {{ amount }}
      </span>
    </div>
    <div class="block-transaction__text-wrapper">
      <span class="block-transaction__text">
        Nonce: {{ nonce }}
      </span>
    </div>
    <div class="block-transaction__text-wrapper">
      <span class="block-transaction__text">
        Signature: {{ signature }}
      </span>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ethers } from 'ethers'

defineProps(['amount', 'nonce', 'receiver', 'sender', 'signature', 'transactionNumber'])
</script>

<style lang="scss" scoped>
.block-transaction {
  border: toRem(1) solid var(--border-primary-main);
}

.block-transaction__text-wrapper {
  padding: toRem(10);
  background: var(--background-secondary-main);

  &:not(:nth-child(even)) {
    border-bottom: toRem(1) solid var(--border-primary-main);
  }
  &:not(:nth-child(even)) {
    border-top: toRem(1) solid var(--border-primary-main);
  }
}

.block-transaction__text {
  font-size: toRem(12);
  word-break: break-word;
}
</style>
