import { readContract } from '@wagmi/core'
import { type Address } from 'viem'
import { config } from '@/helpers/wagmiConfig'
import { type Seed, type Inscription } from '@/helpers/types'
import { getFunctionNames } from '@/helpers/abi/mapping'

export function useInscription() {
  const tokenStore = useTokenStore()

  const functionNames = computed(() => getFunctionNames(tokenStore.tokenInfo?.key ?? ''))

  async function getSeedSvg(seed: Seed) {
    return readContract(config, {
      abi: tokenStore.abiComputed,
      address: tokenStore.tokenAddress,
      functionName: 'getSvg',
      args: [seed]
    })
  }

  async function getSeedAnimatedSvg(seed: Seed) {
    return readContract(config, {
      abi: tokenStore.abiComputed,
      address: tokenStore.tokenAddress,
      functionName: 'getAnimatedSvg',
      args: [seed]
    })
  }

  async function getSeedMeta(seed: Seed) {
    return readContract(config, {
      abi: tokenStore.abiComputed,
      address: tokenStore.tokenAddress,
      functionName: 'getMeta',
      args: [seed]
    })
  }

  async function getInscription(seed: Seed) {
    let svg = ''
    let animatedSvg = ''
    let meta = '{}'

    try {
      svg = (await getSeedSvg(seed)) as string
      animatedSvg = (await getSeedAnimatedSvg(seed)) as string
    } catch (error) {
      console.error('Failed to fetch SVG:', error)
    }

    try {
      meta = (await getSeedMeta(seed)) as string
    } catch (error) {
      console.error('Failed to fetch metadata:', error)
    }

    return {
      svg,
      animatedSvg,
      seed,
      meta: JSON.parse(meta)
    }
  }

  async function fetchInscriptionsBySeeds(seeds: Seed[]) {
    const promises = []

    for (const seed of seeds) {
      promises.push(getInscription(seed))
    }

    const list = await Promise.all(promises)

    return list || []
  }

  async function getInscriptionsByAddress(address: Address) {
    const [mushroomCount, dynamicMushroom] = (await Promise.all([
      readContract(config, {
        abi: tokenStore.abiComputed,
        address: tokenStore.tokenAddress,
        functionName: functionNames.value?.['mushroomCount'],
        args: [address]
      }),
      readContract(config, {
        abi: tokenStore.abiComputed,
        address: tokenStore.tokenAddress,
        functionName: functionNames.value?.['sporesDegree'],
        args: [address]
      })
    ])) as [number, Seed]

    const seedPromises = Array.from({ length: Number(mushroomCount) }, async (_, index) => {
      return readContract(config, {
        abi: tokenStore.abiComputed,
        address: tokenStore.tokenAddress,
        functionName: functionNames.value?.['mushroomOfOwnerByIndex'],
        args: [address, index]
      })
    })

    let seeds = (await Promise.all(seedPromises)) as Seed[]

    seeds = seeds.map((seed) => ({
      seed: seed.seed,
      seed2: seed.seed2,
      extra: seed.extra,
      creator: seed.creator,
      owner: address
    }))

    if (Number(dynamicMushroom.seed)) {
      seeds.unshift({
        isDynamic: true,
        seed: dynamicMushroom.seed,
        seed2: dynamicMushroom.seed2,
        extra: dynamicMushroom.extra,
        creator: '0x0000000000000000000000000000000000000000',
        owner: address
      })
    }

    return fetchInscriptionsBySeeds(seeds) as Promise<Inscription[]>
  }

  return {
    getInscriptionsByAddress
  }
}
