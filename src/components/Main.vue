<template>
 <main class="main">

 </main>
</template>

<script lang="js" setup>
import { useBlockchainStore } from '@/store'
import { Blockchain, Account, Transaction, Block } from '@/core'

async function initBlockchain() {
  const blockchain = new Blockchain();

// Initialize the blockchain
  await blockchain.initBlockchain();

// Generate two new accounts
  const account1 = await Account.genAccount();
  const account2 = await Account.genAccount();

// Get tokens from the faucet for account1
  await blockchain.getTokenFromFaucet(account1);
  await blockchain.getTokenFromFaucet(account2);

// Create a transaction from account1 to account2
  const operation = account1.createPaymentOp(account2, 50, 123);
  const transaction = new Transaction([operation], 'transaction-123');

// Sign the transaction
  await transaction.signTransaction();

// Create a block containing the transaction
  const block = new Block(blockchain.blockHistory[blockchain.blockHistory.length - 1].blockID, [transaction]);
  await block.calculateBlockID();

// Validate the block and add it to the blockchain
  await blockchain.validateBlock(block);

// Get the account balances after the transaction
  blockchain.getAccountBalances(account1, account2);
}

initBlockchain()
</script>

<style lang="scss" scoped>

</style>
