<script setup lang="ts">
import { useAccount, useDisconnect } from 'use-wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/vue'
import { shortenAddress } from '@/helpers/utils'

const { address } = useAccount()
const { disconnect } = useDisconnect()
const modal = useWeb3Modal()
</script>

<template>
  <div class="flex items-center">
    <div>
      <button
        v-if="!address"
        class="btn btn-primary text-base group min-w-[154px]"
        @click="modal.open()"
      >
        <span> Connect </span>
      </button>
      <div v-else class="dropdown dropdown-bottom dropdown-end">
        <div tabindex="0" role="button" class="btn btn-outline">
          {{ shortenAddress(address) }}
        </div>
        <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box">
          <li><a @click="disconnect()">Disconnect</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
