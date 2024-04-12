import { defineStore } from 'pinia'
import { readContract } from '@wagmi/core'
import { type Address } from 'viem'
import abi from '@/helpers/abi/fungi.json'
import { config } from '@/helpers/wagmiConfig'
import { useAccount } from 'use-wagmi'
import { type Inscription } from '@/helpers/types'
import tokens from '@/helpers/tokens.json'

export const useTokenStore = defineStore('token', () => {
  const { address } = useAccount()
  const { getInscriptionsByAddress } = useInscription()
  const route = useRoute()

  const inscriptions = ref<Inscription[]>([])
  const balanceUnits = ref<bigint>(0n)
  const initializing = ref(false)

  const tokenAddress = computed(() => (route.params.address as string).toLowerCase() as Address)
  const tokenInfo = computed(() => tokens.find((t) => t.address === tokenAddress.value))
  const tokenDecimals = computed(() => tokenInfo.value?.decimals || 18)

  async function init(address: Address) {
    initializing.value = true
    balanceUnits.value = (await readContract(config, {
      abi,
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
    init,
    reload
  }
})
