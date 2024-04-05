import { TOKEN_ADDRESS, TOKEN_DECIMALS } from '@/helpers/constants'
import { config } from '@/helpers/wagmiConfig'
import { readContract, writeContract, waitForTransactionReceipt } from '@wagmi/core'
import { parseUnits, type Address } from 'viem'
import abi from '@/helpers/token.json'
import { type Seed, type Inscription } from '@/helpers/types'

async function getSeedSvg(seed: Seed) {
  return readContract(config, {
    abi,
    address: TOKEN_ADDRESS,
    functionName: 'getSvg',
    args: [seed]
  })
}

async function getSeedMeta(seed: Seed) {
  return readContract(config, {
    abi,
    address: TOKEN_ADDRESS,
    functionName: 'getMeta',
    args: [seed]
  })
}

async function getInscription(seed: Seed) {
  const [svg, meta] = await Promise.all([getSeedSvg(seed), getSeedMeta(seed)])

  return {
    svg,
    seed,
    meta: JSON.parse(meta as string)
  }
}

export async function fetchInscriptionsBySeeds(seeds: Seed[]) {
  const promises = []

  for (const seed of seeds) {
    promises.push(getInscription(seed))
  }

  const list = await Promise.all(promises)

  return list || []
}

export async function getInscriptionsByAddress(address: Address) {
  const [mushroomCount, dynamicMushroom] = (await Promise.all([
    readContract(config, {
      abi,
      address: TOKEN_ADDRESS,
      functionName: 'mushroomCount',
      args: [address]
    }),
    readContract(config, {
      abi,
      address: TOKEN_ADDRESS,
      functionName: 'sporesDegree',
      args: [address]
    })
  ])) as [number, Seed]

  const seedPromises = Array.from({ length: Number(mushroomCount) }, async (_, index) => {
    return readContract(config, {
      abi,
      address: TOKEN_ADDRESS,
      functionName: 'mushroomOfOwnerByIndex',
      args: [address, index]
    })
  })

  let seeds = (await Promise.all(seedPromises)) as Seed[]

  seeds = seeds.map((seed) => ({ seed: seed.seed, extra: seed.extra, owner: address }))

  if (Number(dynamicMushroom.seed)) {
    seeds.unshift({
      isDynamic: true,
      seed: dynamicMushroom.seed,
      extra: dynamicMushroom.extra,
      owner: address
    })
  }

  return fetchInscriptionsBySeeds(seeds) as Promise<Inscription[]>
}

export function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export async function sendTokens(from: Address, to: Address, amount: number) {
  const result = await writeContract(config, {
    abi,
    address: TOKEN_ADDRESS,
    functionName: 'transfer',
    args: [to, parseUnits(amount.toString(), TOKEN_DECIMALS)],
    account: from
  })
  await waitForTransactionReceipt(config, {
    hash: result
  })
}
