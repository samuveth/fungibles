import { defineStore } from 'pinia'
import { readContract } from '@wagmi/core'
import { type Address } from 'viem'
import abi from '@/helpers/abi/fungi.json'
import { config } from '@/helpers/wagmiConfig'
import { TOKEN_ADDRESS } from '@/helpers/constants'
import { getInscriptionsByAddress } from '@/helpers/utils'
import { useAccount } from 'use-wagmi'
import { type Inscription } from '@/helpers/types'

export const useAccountStore = defineStore('account', () => {
  const inscriptions = ref<Inscription[]>([])
  const balanceUnits = ref<bigint>(0n)
  const initialized = ref(false)

  const { address } = useAccount()

  async function init(address: Address) {
    initialized.value = false
    balanceUnits.value = (await readContract(config, {
      abi,
      address: TOKEN_ADDRESS,
      functionName: 'balanceOf',
      args: [address]
    })) as bigint
    inscriptions.value = await getInscriptionsByAddress(address)
    initialized.value = true
  }

  function reload() {
    if (!address.value) return
    init(address.value)
  }

  return { inscriptions, balanceUnits, initialized, init, reload }
})
