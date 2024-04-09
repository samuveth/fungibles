import { TOKEN_ADDRESS, STABILIZER_ADDRESS, TOKEN_DECIMALS } from '@/helpers/constants'
import { config } from '@/helpers/wagmiConfig'
import { readContract, writeContract, waitForTransactionReceipt } from '@wagmi/core'
import { type Address, parseUnits } from 'viem'
import abi from '@/helpers/abi/fungi.json'
import stabilizeAbi from '@/helpers/abi/stabilizer.json'
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

  seeds = seeds.map((seed) => ({
    seed: seed.seed.toString(),
    extra: seed.extra.toString(),
    owner: address
  }))

  if (Number(dynamicMushroom.seed)) {
    seeds.unshift({
      isDynamic: true,
      seed: dynamicMushroom.seed.toString(),
      extra: dynamicMushroom.extra.toString(),
      owner: address
    })
  }

  return fetchInscriptionsBySeeds(seeds) as Promise<Inscription[]>
}

export function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export async function sendTokens(from: Address, to: Address, amount: string) {
  const result = await writeContract(config, {
    abi,
    address: TOKEN_ADDRESS,
    functionName: 'transfer',
    args: [to, amount],
    account: from
  })
  await waitForTransactionReceipt(config, {
    hash: result
  })
}

export async function approveTokens(amount: string) {
  const result = await writeContract(config, {
    abi,
    address: TOKEN_ADDRESS,
    functionName: 'approve',
    args: [STABILIZER_ADDRESS, amount]
  })
  await waitForTransactionReceipt(config, {
    hash: result
  })
}

export async function checkAllowance(owner: Address, amount: bigint) {
  const result = (await readContract(config, {
    abi,
    address: TOKEN_ADDRESS,
    functionName: 'allowance',
    args: [owner, STABILIZER_ADDRESS]
  })) as bigint

  console.log('🚀 ~ checkAllowance ~ result < amount:', result, amount, result < amount)
  if (result < amount) {
    await approveTokens(amount.toString())
  }
}

export async function stabilizeInscription(owner: Address, amount: string) {
  const parsedAmount = parseUnits(amount, TOKEN_DECIMALS)

  await checkAllowance(owner, parsedAmount)

  const result = await writeContract(config, {
    abi: stabilizeAbi,
    address: STABILIZER_ADDRESS,
    functionName: 'stabilize',
    args: [parsedAmount]
  })
  await waitForTransactionReceipt(config, {
    hash: result
  })
}

export async function generateInscriptions(owner: Address, amounts: string[], sendAmount: string) {
  const parsedAmounts = amounts.map((amount) => parseUnits(amount, TOKEN_DECIMALS))
  const parsedSendAmount = parseUnits(sendAmount, TOKEN_DECIMALS)

  const amountsTotal = parsedAmounts.reduce((acc, amount) => acc + amount, 0n)

  await checkAllowance(owner, amountsTotal * 2n)

  const result = await writeContract(config, {
    abi: stabilizeAbi,
    address: STABILIZER_ADDRESS,
    functionName: 'stabilizeMultiple',
    args: [parsedAmounts, parsedSendAmount]
  })
  await waitForTransactionReceipt(config, {
    hash: result
  })
}

export async function combineInscriptions(owner: Address, amounts: string[]) {
  const parsedAmounts = amounts.map((amount) => parseUnits(amount, TOKEN_DECIMALS))

  const amountsTotal = parsedAmounts.reduce((acc, amount) => acc + amount, 0n)

  await checkAllowance(owner, amountsTotal)

  const result = await writeContract(config, {
    abi: stabilizeAbi,
    address: STABILIZER_ADDRESS,
    functionName: 'combineAndStabilize',
    args: [parsedAmounts]
  })
  await waitForTransactionReceipt(config, {
    hash: result
  })
}
