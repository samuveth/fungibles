import { type Address } from 'viem'

export type Seed = {
  isDynamic?: boolean
  seed: bigint
  seed2?: bigint
  creator?: Address
  extra: bigint
  owner: Address
}

export type Inscription = {
  svg: string
  animatedSvg?: string
  seed: Seed
  meta: Record<string, any>
}

export type SeedNoBigint = {
  isDynamic?: boolean
  seed: string
  extra: string
  owner: Address
}

export type Token = {
  name: string
  about: string
  symbol: string
  logo: string
  banner: string
  address: string
  pairAddress: string
  decimals: number
  website?: string
  twitter?: string
  telegram?: string
}
