<script setup lang="ts">
const modalStore = useModalStore()
</script>

<template>
  <BaseModal
    title="Confirm Token Spending"
    :open="modalStore.spendingOpen"
    @close="modalStore.spendingOpen = false"
  >
    <div class="leading-5">
      This action requires you to approve our contract the suggested amount shown in your wallet. If
      you don't want to approve spending for each future action, you can approve a larger amount.
      <details class="collapse collapse-arrow border border-base-300 bg-base-200 mt-3">
        <summary class="collapse-title">Learn more</summary>
        <div class="collapse-content">
          <p>
            To interact with our generator contract, you'll need to grant it permission to use your
            tokens. This contract can't transfer your tokens to any location other than your wallet.
            Plus, your tokens are never held by the contract itself; they're always sent back to
            your wallet in the same transaction they were received by the contract.
          </p>
          <div role="alert" class="alert alert-info mt-2">
            <div>
              Checkout the contract code
              <a
                href="https://basescan.org/address/0x121805b1d9E97CC041BDA927cCf1c651467E1BD5#code"
                target="_blank"
                class="underline"
                >here</a
              >.
            </div>
          </div>
        </div>
      </details>
    </div>
  </BaseModal>
</template>
