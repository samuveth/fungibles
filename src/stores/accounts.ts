import { defineStore } from 'pinia'
import { readContract } from '@wagmi/core'
import { type Address } from 'viem'
import abi from '@/helpers/token.json'
import { config } from '@/helpers/wagmiConfig'
import { TOKEN_ADDRESS } from '@/helpers/constants'
import { getInscriptionsByAddress } from '@/helpers/utils'
import { useAccount } from 'use-wagmi'
import { type Inscription } from '@/helpers/types'

export const useAccountsStore = defineStore('accounts', () => {
  const inscriptions = ref<Record<string, Inscription[]>>({})
  const balanceUnits = ref<Record<string, bigint>>({})

  const { addresses } = useAccount()

  async function init(addressIndex: number, address: Address) {
    balanceUnits.value[addressIndex] = (await readContract(config, {
      abi,
      address: TOKEN_ADDRESS,
      functionName: 'balanceOf',
      args: [address]
    })) as bigint
    inscriptions.value[addressIndex] = await getInscriptionsByAddress(address)
  }

  function reload() {
    if (!addresses.value) return
    addresses.value.forEach((address, index) => {
      init(index, address)
    })
  }

  return { inscriptions, balanceUnits, init, reload }
})
