import { type Address } from 'viem'

export type Seed = {
  isDynamic?: boolean
  seed: string
  extra: string
  owner: Address
}

export type Inscription = {
  svg: string
  seed: Seed
  meta: Record<string, any>
}
