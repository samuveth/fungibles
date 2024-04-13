<script setup lang="ts">
import { useAccount } from 'use-wagmi'
import IconX from '~icons/icon/x'
import IconTelegram from '~icons/icon/telegram'
import IconGlobeAlt from '~icons/heroicons/globe-alt-solid'

const tokenStore = useTokenStore()
const { address } = useAccount()
const { combineInscriptions, generateInscriptions } = useTransaction()

const showCombineMultipleModal = ref(false)
const generateModalOpen = ref(false)

// const balance = computed(() => {
//   if (!tokenStore.balanceUnits) return '0'
//   return formatUnits(tokenStore.balanceUnits, tokenStore.tokenDecimals)
// })

const dynamicInscription = computed(() => tokenStore.inscriptions.find((i) => i.seed.isDynamic))

const hasLessThanOneInscription = computed(() => tokenStore.inscriptions.length < 2)

const actions = computed(() => {
  const list = []

  list.push({
    label: 'Combine Inscriptions',
    tooltip: hasLessThanOneInscription.value ? 'Requires two inscriptions' : null,
    disabled: hasLessThanOneInscription.value,
    action: () => {
      showCombineMultipleModal.value = true
    }
  })

  list.push({
    label: 'Generate Inscriptions',
    tooltip: generateTooltip.value,
    action: () => {
      generateModalOpen.value = true
    },
    disabled: !dynamicInscription.value || dynamicInscription.value.seed.seed < 2n
  })

  return list
})

const generateTooltip = computed(() => {
  if (!dynamicInscription.value) return 'No dynamic inscription found'
  if (dynamicInscription.value.seed.seed < 2n) return 'Minimum dynamic 2'
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

  return list
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
      <h2 class="text-xl flex items-center gap-2">
        <img :src="tokenStore.tokenInfo?.logo" class="w-[24px] h-[24px] rounded-full" />
        <span class="font-semibold"> {{ tokenStore.tokenInfo?.name }} </span>
        / {{ tokenStore.tokenInfo?.symbol }}
        <!-- <button class="text-sm pl-2 flex items-center gap-1" @click="copyAddress">
          {{ shortenAddress(tokenStore.tokenInfo?.address || '') }}
          <i-hi-square-2-stack />
        </button> -->
      </h2>

      <div class="flex items-center justify-end -mr-2">
        <a
          v-for="(social, i) in projectSocials"
          :href="social.link"
          target="_blank"
          :key="i"
          class="btn btn-outline border-0 btn-sm px-3 hover:bg-transparent hover:text-primary"
        >
          <component :is="social.icon" :class="social.size" />
        </a>
      </div>
    </div>
    <div class="sm:flex gap-2 space-y-2 pt-4 sm:mt-0 sm:space-y-0 mb-4">
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
          {{ action.label }}
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
          <h3 class="text-xl font-semibold mb-2">Dynamic {{ tokenStore.tokenInfo?.name }}</h3>
        </div>

        <div v-if="!dynamicInscriptions.length" class="">
          No dynamic {{ tokenStore.tokenInfo?.name }} found
        </div>
        <InscriptionList v-else :inscriptions="dynamicInscriptions" />
      </div>

      <div class="mt-6">
        <div>
          <h3 class="text-xl font-semibold mb-2">
            Stable {{ tokenStore.tokenInfo?.name }}
            <div class="badge badge-lg font-normal">{{ stableInscriptions.length }}</div>
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
  </div>
</template>
