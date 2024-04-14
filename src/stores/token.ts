import { defineStore } from 'pinia'
import { readContract } from '@wagmi/core'
import { type Address } from 'viem'
import { config } from '@/helpers/wagmiConfig'
import { useAccount } from 'use-wagmi'
import { type Inscription } from '@/helpers/types'
import tokens from '@/helpers/tokens.json'
import abis from '@/helpers/abi'

export const useTokenStore = defineStore('token', () => {
  const { address } = useAccount()
  const { getInscriptionsByAddress } = useInscription()
  const route = useRoute()

  const inscriptions = ref<Inscription[]>([])
  const balanceUnits = ref<bigint>(0n)
  const initializing = ref(false)

  const tokenAddress = computed(() => (route.params.address as string).toLowerCase() as Address)
  const tokenInfo = computed(() =>
    tokens.find((t) => t.address.toLowerCase() === tokenAddress.value)
  )
  const tokenDecimals = computed(() => tokenInfo.value?.decimals || 18)
  const abiComputed = computed(() => {
    if (!tokenInfo.value) return
    return (abis as any)[tokenInfo.value.key]
  })

  async function init(address: Address) {
    initializing.value = true
    balanceUnits.value = (await readContract(config, {
      abi: abiComputed.value,
      address: tokenAddress.value,
      functionName: 'balanceOf',
      args: [address]
    })) as bigint
    inscriptions.value = await getInscriptionsByAddress(address)
    initializing.value = false
  }

  function reload() {
    if (!address.value) return
    init(address.value)
  }

  return {
    inscriptions,
    balanceUnits,
    initializing,
    tokenAddress,
    tokenDecimals,
    tokenInfo,
    abiComputed,
    init,
    reload
  }
})
