<template>
  <div class="block">
    <div class="block__header">
      <div class="block__header-text-wrapper">
        <span class="block__header-text">
          Block Number: {{ blockNumber }}
        </span>
      </div>
      <div class="block__header-text-wrapper">
        <span class="block__header-text">
          blockID: {{ blockID }}
        </span>
      </div>
      <div class="block__header-text-wrapper">
        <span class="block__header-text">
         prevHash: {{ prevHash }}
        </span>
      </div>
      <div v-if="operations?.length" class="block__transactions">
        <BlockTransaction
            v-for="(operation, idx) in transactions"
            :key="idx"
            :amount="operation.amount"
            :nonce="operation.nonce"
            :receiver="operation.receiver"
            :sender="operation.sender"
            :signature="operation.signature"
            :transactionNumber="idx + 1"
        />
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import {computed} from "vue";
import {ethers} from "ethers";
import BlockTransaction from "./BlockTransaction.vue";

const props = defineProps(['blockID', 'prevHash', 'setOfTransactions', 'blockNumber'])

const operations = computed(() => {
  if (!props.setOfTransactions.length) return []
  return props.setOfTransactions ?? []
})

const transactions = computed(() => (
    operations.value?.length ?
      operations.value.map(operation => {
        return operation?.setOfOperations?.length ? operation?.setOfOperations?.map(operation => {
          return {
            amount: operation.amount,
            nonce: operation.nonce,
            receiver: ethers.computeAddress(operation.receiver.wallet.publicKey),
            sender: ethers.computeAddress(operation.sender.wallet.publicKey),
            signature: operation.signature
          }
        }) : []
      }) : []
    ).flat()
)
</script>

<style lang="scss" scoped>
.block {
  width: toRem(400);
  min-width: toRem(400);
  height: toRem(437);
  border: toRem(1) solid var(--border-primary-main);
}

.block__header-text-wrapper {
  padding: toRem(10);
  border-bottom: toRem(1) solid var(--border-primary-main);
  background: var(--background-primary-main);
}

.block__header-text {
  font-size: toRem(14);
}

.block__transactions {
  display: flex;
  flex-direction: column;
  max-height: toRem(324);
  overflow-y: auto;
  gap: toRem(10);
  padding: toRem(5) toRem(20);
}
</style>
