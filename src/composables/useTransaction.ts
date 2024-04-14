import { readContract, writeContract, waitForTransactionReceipt } from '@wagmi/core'
import { type Address, type Hash, parseUnits } from 'viem'
import { STABILIZER_ADDRESS } from '@/helpers/constants'
import { config } from '@/helpers/wagmiConfig'
import stabilizeAbi from '@/helpers/abi/stabilizer.json'

export function useTransaction() {
  const modalStore = useModalStore()
  const tokenStore = useTokenStore()

  function addTransaction(transaction: Hash) {
    modalStore.pendingOpen = true
    modalStore.pendingTransaction = transaction
  }

  function removeTransaction() {
    modalStore.pendingOpen = false
    modalStore.pendingTransaction = undefined
  }

  async function approveTokens(amount: string) {
    modalStore.spendingOpen = true
    try {
      const result = await writeContract(config, {
        abi: tokenStore.abiComputed,
        address: tokenStore.tokenAddress,
        functionName: 'approve',
        args: [STABILIZER_ADDRESS, amount]
      })
      modalStore.spendingOpen = false

      addTransaction(result)
      await waitForTransactionReceipt(config, {
        hash: result
      })
    } catch (e) {
      console.error(e)
      throw e
    } finally {
      modalStore.spendingOpen = false
      removeTransaction()
    }
  }

  async function checkAllowance(owner: Address, amount: bigint) {
    const result = (await readContract(config, {
      abi: tokenStore.abiComputed,
      address: tokenStore.tokenAddress,
      functionName: 'allowance',
      args: [owner, STABILIZER_ADDRESS]
    })) as bigint

    if (result < amount) {
      await approveTokens(amount.toString())
    }
  }

  async function stabilizeInscription(owner: Address, amount: bigint) {
    try {
      const parsedAmount = parseUnits(amount.toString(), tokenStore.tokenDecimals)

      await checkAllowance(owner, parsedAmount)
      modalStore.confirmOpen = true
      const result = await writeContract(config, {
        abi: stabilizeAbi,
        address: STABILIZER_ADDRESS,
        functionName: 'stabilize',
        args: [parsedAmount, tokenStore.tokenAddress]
      })
      modalStore.confirmOpen = false
      addTransaction(result)
      await waitForTransactionReceipt(config, {
        hash: result
      })
      tokenStore.reload()
    } catch (e) {
      console.error(e)
    } finally {
      modalStore.confirmOpen = false
      removeTransaction()
    }
  }

  async function generateInscriptions(owner: Address, amounts: string[], sendAmount: bigint) {
    try {
      const parsedAmounts = amounts.map((amount) => parseUnits(amount, tokenStore.tokenDecimals))
      const parsedSendAmount = parseUnits(sendAmount.toString(), tokenStore.tokenDecimals)

      const amountsTotal = parsedAmounts.reduce((acc, amount) => acc + amount, 0n)

      await checkAllowance(owner, parsedSendAmount + amountsTotal)
      modalStore.confirmOpen = true
      const result = await writeContract(config, {
        abi: stabilizeAbi,
        address: STABILIZER_ADDRESS,
        functionName: 'stabilizeMultiple',
        args: [parsedAmounts, parsedSendAmount, tokenStore.tokenAddress]
      })
      modalStore.confirmOpen = false
      addTransaction(result)
      await waitForTransactionReceipt(config, {
        hash: result
      })
      tokenStore.reload()
    } catch (e) {
      console.error(e)
    } finally {
      modalStore.confirmOpen = false
      removeTransaction()
    }
  }

  async function combineInscriptions(owner: Address, amounts: bigint[]) {
    try {
      const parsedAmounts = amounts.map((amount) =>
        parseUnits(amount.toString(), tokenStore.tokenDecimals)
      )

      const amountsTotal = parsedAmounts.reduce((acc, amount) => acc + amount, 0n)

      await checkAllowance(owner, amountsTotal)
      modalStore.confirmOpen = true
      const result = await writeContract(config, {
        abi: stabilizeAbi,
        address: STABILIZER_ADDRESS,
        functionName: 'combineMultiple',
        args: [parsedAmounts, tokenStore.tokenAddress]
      })
      modalStore.confirmOpen = false
      addTransaction(result)
      await waitForTransactionReceipt(config, {
        hash: result
      })
      tokenStore.reload()
    } catch (e) {
      console.error(e)
    } finally {
      modalStore.confirmOpen = false
      removeTransaction()
    }
  }

  async function sendTokens(from: Address, to: Address, amount: string) {
    try {
      modalStore.confirmOpen = true
      const result = await writeContract(config, {
        abi: tokenStore.abiComputed,
        address: tokenStore.tokenAddress,
        functionName: 'transfer',
        args: [to, amount],
        account: from
      })
      modalStore.confirmOpen = false
      addTransaction(result)
      await waitForTransactionReceipt(config, {
        hash: result
      })
      tokenStore.reload()
    } catch (e) {
      console.error(e)
    } finally {
      modalStore.confirmOpen = false

      removeTransaction()
    }
  }

  return { stabilizeInscription, generateInscriptions, combineInscriptions, sendTokens }
}
