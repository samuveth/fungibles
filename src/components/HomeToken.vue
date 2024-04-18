<script setup lang="ts">
import { useAccount } from 'use-wagmi'
import { type Address } from 'viem'
import IconX from '~icons/icon/x'
import IconTelegram from '~icons/icon/telegram'
import IconDexscreener from '~icons/icon/dexscreener'
import IconGlobeAlt from '~icons/heroicons/globe-alt-solid'
import IconArrowIn from '~icons/heroicons/arrows-pointing-in-solid'
import IconArrowPath from '~icons/heroicons/arrow-path-rounded-square-solid'
import IconAirplane from '~icons/heroicons/paper-airplane'

const tokenStore = useTokenStore()
const { address } = useAccount()
const { combineInscriptions, generateInscriptions, sendMultipleInscriptions } = useTransaction()

const showCombineMultipleModal = ref(false)
const generateModalOpen = ref(false)
const showSendMultipleModal = ref(false)

// const balance = computed(() => {
//   if (!tokenStore.balanceUnits) return '0'
//   return formatUnits(tokenStore.balanceUnits, tokenStore.tokenDecimals)
// })

const dynamicInscription = computed(() => tokenStore.inscriptions.find((i) => i.seed.isDynamic))

const hasLessThanOneInscription = computed(() => tokenStore.inscriptions.length < 2)

const actions = computed(() => {
  const list = []

  list.push({
    label: 'Combine',
    tooltip: combineTooltip.value,
    icon: IconArrowIn,
    disabled: hasLessThanOneInscription.value || tokenStore.tokenInfo?.key === 'pepi',
    action: () => {
      showCombineMultipleModal.value = true
    }
  })

  list.push({
    label: 'Generate',
    tooltip: generateTooltip.value,
    icon: IconArrowPath,
    action: () => {
      generateModalOpen.value = true
    },
    disabled:
      !dynamicInscription.value ||
      dynamicInscription.value.seed.seed < 2n ||
      tokenStore.tokenInfo?.key === 'pepi'
  })

  list.push({
    label: 'Send',
    tooltip: null,
    icon: IconAirplane,
    action: () => {
      showSendMultipleModal.value = true
    }
  })

  return list
})

const combineTooltip = computed(() => {
  if (tokenStore.tokenInfo?.key === 'pepi') return 'Not available for Pepi'
  if (hasLessThanOneInscription.value) return 'Requires two inscriptions'
  return null
})

const generateTooltip = computed(() => {
  if (tokenStore.tokenInfo?.key === 'pepi') return 'Not available for Pepi'
  if (!dynamicInscription.value) return 'Requires dynamic'
  if (dynamicInscription.value.seed.seed < 2n) return 'Not enough tokens'
  return null
})

const dynamicInscriptions = computed(() => tokenStore.inscriptions.filter((i) => i.seed.isDynamic))
const stableInscriptions = computed(() => tokenStore.inscriptions.filter((i) => !i.seed.isDynamic))

async function handleCombine(amounts: bigint[]) {
  if (!address.value) return

  showCombineMultipleModal.value = false
  await combineInscriptions(address.value, amounts)
}

async function handleGenerate(amounts: string[]) {
  if (!dynamicInscription.value) return
  generateModalOpen.value = false
  await generateInscriptions(
    dynamicInscription.value.seed.owner,
    amounts,
    dynamicInscription.value.seed.seed
  )
}

async function handleSendMultiple(to: Address, seeds: bigint[]) {
  if (!to || !address.value) return
  showSendMultipleModal.value = false
  await sendMultipleInscriptions(to, address.value, seeds)
}

const projectSocials = computed(() => {
  if (!tokenStore.tokenInfo) return []
  const list = []

  if (tokenStore.tokenInfo.website) {
    list.push({
      icon: IconGlobeAlt,
      link: tokenStore.tokenInfo.website,
      size: 'text-lg'
    })
  }
  if (tokenStore.tokenInfo.twitter) {
    list.push({
      icon: IconX,
      link: tokenStore.tokenInfo.twitter,
      size: 'text-[17px]'
    })
  }
  if (tokenStore.tokenInfo.telegram) {
    list.push({
      icon: IconTelegram,
      link: tokenStore.tokenInfo.telegram,
      size: 'text-[22px]'
    })
  }
  if (tokenStore.tokenInfo.pairAddress) {
    list.push({
      icon: IconDexscreener,
      link: `https://dexscreener.com/base/${tokenStore.tokenInfo.pairAddress}`,
      size: 'text-[16px]'
    })
  }

  return list
})

const hasBrokenSeed2 = computed(() => {
  if (
    tokenStore.tokenInfo?.key === 'pepi' &&
    tokenStore.inscriptions.some((i) => i.seed.seed2 === 0n)
  )
    return true
  return false
})

// function copyAddress() {
//   if (!tokenStore.tokenInfo) return
//   navigator.clipboard.writeText(tokenStore.tokenInfo.address)
// }

watch(
  address,
  async () => {
    if (address.value) tokenStore.init(address.value)
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <div class="sm:flex justify-between px-4 py-5 bg-base-200 rounded">
      <h2 class="text-xl flex items-center gap-2 pl-0.5">
        <img :src="tokenStore.tokenInfo?.logo" class="w-[24px] h-[24px] rounded-full" />
        <span class="font-semibold"> {{ tokenStore.tokenInfo?.name }} </span>
        / {{ tokenStore.tokenInfo?.symbol }}
        <!-- <button class="text-sm pl-2 flex items-center gap-1" @click="copyAddress">
          {{ shortenAddress(tokenStore.tokenInfo?.address || '') }}
          <i-hi-square-2-stack />
        </button> -->
      </h2>

      <div class="flex items-center justify-end -mr-1">
        <a
          v-for="(social, i) in projectSocials"
          :href="social.link"
          target="_blank"
          :key="i"
          class="btn btn-outline border-0 btn-sm px-2 hover:bg-transparent hover:text-primary"
        >
          <component :is="social.icon" :class="social.size" />
        </a>
      </div>
    </div>
    <div v-if="hasBrokenSeed2" role="alert" class="alert alert-warning mt-2">
      <i-hi-exclamation-circle />
      You have some invalid {{ tokenStore.tokenInfo?.name }}
      in your wallet. Send your entire balance to another wallet to fix this.
    </div>
    <div class="pt-2 sm:mt-0 mb-4 flex gap-2">
      <div
        v-for="(action, i) in actions"
        :key="i"
        class="tooltip w-full sm:w-auto"
        :data-tip="action.tooltip"
      >
        <button
          class="btn btn-primary w-full sm:w-auto"
          :disabled="action.disabled"
          @click="action.action()"
        >
          <component :is="action.icon" class="text-md" />
          <span class="hidden sm:block">
            {{ action.label }}
          </span>
        </button>
      </div>
    </div>

    <div v-if="tokenStore.initializing" class="justify-center flex">
      <span class="loading loading-spinner loading-sm"></span>
    </div>
    <div v-else-if="!address">
      <div class="text-xl">Connect your wallet to manage your fungibles.</div>
    </div>
    <template v-else>
      <div>
        <div>
          <h3 class="text-lg font-semibold mb-2">Dynamic {{ tokenStore.tokenInfo?.name }}</h3>
        </div>

        <div v-if="!dynamicInscriptions.length" class="">
          No dynamic {{ tokenStore.tokenInfo?.name }} found
        </div>
        <InscriptionList v-else :inscriptions="dynamicInscriptions" />
      </div>

      <div class="mt-6">
        <div>
          <h3 class="text-lg font-semibold mb-2">
            Stable {{ tokenStore.tokenInfo?.name }}
            <div v-if="stableInscriptions.length > 0" class="badge badge-lg font-normal">
              {{ stableInscriptions.length }}
            </div>
          </h3>
        </div>

        <div v-if="!stableInscriptions.length" class="">
          No stable {{ tokenStore.tokenInfo?.name }} found
        </div>
        <InscriptionList v-else :inscriptions="stableInscriptions" />
      </div>
    </template>

    <ModalCombine
      :open="showCombineMultipleModal"
      :inscriptions="tokenStore.inscriptions"
      @close="showCombineMultipleModal = false"
      @combine="handleCombine"
    />
    <ModalGenerate
      v-if="dynamicInscription"
      :open="generateModalOpen"
      :inscription="dynamicInscription"
      @close="generateModalOpen = false"
      @generate="handleGenerate"
    />
    <ModalSendMultiple
      :open="showSendMultipleModal"
      :inscriptions="tokenStore.inscriptions"
      @close="showSendMultipleModal = false"
      @sendMultiple="handleSendMultiple"
    />

    <ModalTransactionSpending />
    <ModalTransactionPending />
    <ModalTransactionConfirm />
  </div>
</template>
