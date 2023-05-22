<template>
  <div class="blockchain-account">
    <div class="blockchain-account__section">
      <span class="blockchain-account__section-text">
        Wallet Address: {{ walletAddress }}
      </span>
    </div>
    <div class="blockchain-account__section">
      <span class="blockchain-account__section-text">
        Current Balance: {{ account.balance }}
      </span>
    </div>
    <div class="blockchain-account__actions">
      <div class="blockchain-account__action">
        <input
            v-model="form.tokensFromFaucetAmount"
            class="blockchain-account__input"
            placeholder="Input amount to get tokens from faucet:"
        />
        <ui-button
            class="blockchain-account__button"
            text="Get"
            @click="getTokens"
        />
      </div>
    </div>
    <div class="blockchain-account__actions">
      <div class="blockchain-account__send-action">
        <input
            v-model="form.walletAddressToSend"
            class="blockchain-account__input"
            placeholder="Input wallet address to send tokens:"
        />
        <input
            v-model="form.tokensToSendAmount"
            class="blockchain-account__input"
            placeholder="Input amount to send tokens:"
        />
        <ui-button
            class="blockchain-account__send-button"
            text="Send"
            @click="sendTokens"
        />
        <ui-button
            class="blockchain-account__send-button"
            text="Sign transaction"
            @click="signTransaction"
        />
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import {computed, reactive, ref} from "vue";
import {ethers} from "ethers";
import { useBlockchainStore } from '@/store'
import UiButton from "@/components/ui/UiButton.vue";
import { Transaction } from "@/core";

const MAX_RANDOM = 1000000

const props = defineProps(['account'])

const blockchainStore = useBlockchainStore();

const form = reactive({
  tokensFromFaucetAmount: '',
  walletAddressToSend: '',
  tokensToSendAmount: ''
})

const currentTransaction = ref(null)

const walletAddress = computed(() => ethers.computeAddress(props.account.wallet.publicKey))

const getRandomInt = () => Math.floor(Math.random() * MAX_RANDOM)

const getTokens = async () => {
  try {
    await blockchainStore.blockchain.getTokenFromFaucet(props.account, Number(form.tokensFromFaucetAmount));
    form.tokensFromFaucetAmount = ''
  } catch (e) {
    console.log(e)
  }
}

const sendTokens = async () => {
  try {
    currentTransaction.value = []
    const foundAccount = blockchainStore.accounts.find(
        account => ethers.computeAddress(account.wallet.publicKey) === form.walletAddressToSend
    )
    const operation = props.account.createPaymentOp(foundAccount, Number(form.tokensToSendAmount), getRandomInt());
    currentTransaction.value = new Transaction([operation], getRandomInt());
    blockchainStore.addTransactionToBlock(currentTransaction.value)
  } catch (e) {
    console.log(e)
  }
}

const signTransaction = async () => {
  try {
    await currentTransaction.value.signTransaction();
  } catch (e) {
    console.log(e)
  }
}
</script>

<style lang="scss" scoped>
.blockchain-account {
  border: toRem(1) solid var(--border-primary-main);
}

.blockchain-account__section {
  padding: toRem(10);

  &:nth-child(even) {
    border-top: toRem(1) solid var(--border-primary-main);
    border-bottom: toRem(1) solid var(--border-primary-main);
  }
}

.blockchain-account__send-action {
  display: flex;
  flex-direction: column;
  gap: toRem(10);
  border-top: toRem(1) solid var(--border-primary-main);
  border-bottom: toRem(1) solid var(--border-primary-main);
  padding: toRem(10);
}

.blockchain-account__actions {
  display: flex;
  flex-direction: column;
  gap: toRem(10);
}

.blockchain-account__action {
  display: flex;
  gap: toRem(10);
  padding: toRem(10);
}

.blockchain-account__send-button {
  width: 100%;
}

.blockchain-account__input {
  flex: 1;
  background: none;
  border-radius: toRem(10);
  padding: 0 toRem(10);
  min-height: toRem(41);
}

.blockchain-account__button {
  width: toRem(100);
}
</style>
