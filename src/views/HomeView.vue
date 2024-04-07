<script setup lang="ts">
import { useAccount, useConnect } from 'use-wagmi'
import { connectors } from '@/helpers/wagmiConfig'

const { addresses } = useAccount()
const { connect } = useConnect()
</script>

<template>
  <main class="px-4 pt-4 pb-[73px] max-w-7xl mx-auto">
    <div v-if="addresses?.length" class="grid grid-cols-2 gap-4">
      <BlockManage v-for="(_, i) in addresses.length" :key="i" :addressIndex="i" />
      <div class="p-4 border">
        <div class="border p-4 border-dashed border-opacity-50 space-y-2">
          <h3 class="text-lg">Connect more accounts</h3>
          <p v-if="addresses.length < 2">
            A minimum of 2 accounts is required to send fungi back and forth between them.
          </p>
          <p>
            You can connect as many accounts as you like. Connect and select all the accounts you
            want to use in your wallet.
          </p>
          <button class="btn btn-primary mt-4" @click="connect({ connector: connectors[0] })">
            Connect
          </button>
        </div>
      </div>
    </div>
    <div v-else class="max-w-4xl mx-auto">
      <div role="alert" class="alert alert-warning mb-4">
        <i-icon-info />
        <span class="mt-0.5"
          >Currently in beta. Use with caution! Please provide any feedback you have
          <a href="https://tally.so/r/n9W0zV" target="_blank" class="underline">here</a>.</span
        >
      </div>

      <article class="space-y-3">
        <p>
          <b>Welcome to Fungibles.xyz</b> - The goal of this app is to improve the experience of
          generating and managing ERC-20i $FUNGI tokens. This project is fully open-source and by
          the community, for the community, if you would like to contribute please reach out.
        </p>

        <p>
          Links to my twitter and the open-source repository for this project can be found in the
          footer of this page.
        </p>

        <h3>Features:</h3>
        <ul class="list-disc list-inside">
          <li>Save your favorite inscriptions for later</li>
          <li>Easily send fungi between accounts</li>
          <li>Stabilize dynamic fungi with one click</li>
        </ul>

        <h3>Upcoming features:</h3>
        <ul class="list-disc list-inside">
          <li>Mobile support</li>
          <li>Copy or export fungi image</li>
          <li>More fungi management features</li>
          <li>Contests and leader board</li>
          <li>Gamified fungi generation</li>
          <li>... and more!</li>
        </ul>

        <h3>Official socials:</h3>
        <ul>
          <li class="list-disc list-inside">
            <a href="https://twitter.com/Fungi_ERC20i" target="_blank" class="underline"
              >Fungi_ERC20i Twitter</a
            >
          </li>
          <li class="list-disc list-inside">
            <a href="https://twitter.com/toddstooldoteth" target="_blank" class="underline"
              >ToddStool Twitter</a
            >
          </li>
        </ul>

        <h3>Learn more:</h3>

        <ul>
          <li class="list-disc list-inside">
            <a
              href="https://dexscreener.com/base/0x8ce9b689018fc94f44540b62ba6e10dc8b346448"
              target="_blank"
              class="underline"
              >Join the Telegram</a
            >
          </li>
          <li class="list-disc list-inside">
            <a href="https://fungifungi.art/" target="_blank" class="underline"
              >Fungifungi.art Website</a
            >
          </li>
          <li class="list-disc list-inside">
            <a href="https://fungifungi.art/whitepaper.pdf" target="_blank" class="underline"
              >Whitepaper</a
            >
          </li>
          <li class="list-disc list-inside">
            <a
              href="https://dexscreener.com/base/0x8ce9b689018fc94f44540b62ba6e10dc8b346448"
              target="_blank"
              class="underline"
              >DexScreener</a
            >
          </li>
        </ul>

        <p class="pt-6">
          🍄🍄🍄🍄🍄🍄🍄🍄 I am once again drinking beers and smoking cigs in the fungus patch
          🍄🍄🍄🍄🍄🍄🍄🍄
        </p>

        <!-- <h3 class="text-xl pt-6">Connect Accounts</h3> -->
        <!-- <div class="flex gap-4">
          <img src="@/../public/metamaskaccounts.png" alt="metamaskaccounts" class="w-1/3" />
          <div class="space-y-3">
            <p>
              Connect your wallet to start generating fungi. A minimum of 2 accounts is required to
              send fungi back and forth between them.
            </p>
            <p>
              We recommend using MetaMask, as some other wallets might not support connecting
              multiple accounts at once. Connect and select all the accounts you want to use in your
              wallet.
            </p>
          </div>
        </div> -->
      </article>
    </div>
  </main>
</template>
