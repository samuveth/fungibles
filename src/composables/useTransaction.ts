import { readContract, writeContract, waitForTransactionReceipt } from '@wagmi/core'
import { type Address, type Hash, parseUnits } from 'viem'
import { TOKEN_ADDRESS, STABILIZER_ADDRESS, TOKEN_DECIMALS } from '@/helpers/constants'
import abi from '@/helpers/abi/fungi.json'
import { config } from '@/helpers/wagmiConfig'
import stabilizeAbi from '@/helpers/abi/stabilizer.json'

export function useTransaction() {
  const modalStore = useModalStore()
  const accountStore = useAccountStore()

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
        abi,
        address: TOKEN_ADDRESS,
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
      abi,
      address: TOKEN_ADDRESS,
      functionName: 'allowance',
      args: [owner, STABILIZER_ADDRESS]
    })) as bigint

    if (result < amount) {
      await approveTokens(amount.toString())
    }
  }

  async function stabilizeInscription(owner: Address, amount: bigint) {
    try {
      const parsedAmount = parseUnits(amount.toString(), TOKEN_DECIMALS)

      await checkAllowance(owner, parsedAmount)
      modalStore.confirmOpen = true
      const result = await writeContract(config, {
        abi: stabilizeAbi,
        address: STABILIZER_ADDRESS,
        functionName: 'stabilize',
        args: [parsedAmount]
      })
      modalStore.confirmOpen = false
      addTransaction(result)
      await waitForTransactionReceipt(config, {
        hash: result
      })
      accountStore.reload()
    } catch (e) {
      console.error(e)
    } finally {
      modalStore.confirmOpen = false
      removeTransaction()
    }
  }

  async function generateInscriptions(owner: Address, amounts: string[], sendAmount: bigint) {
    try {
      const parsedAmounts = amounts.map((amount) => parseUnits(amount, TOKEN_DECIMALS))
      const parsedSendAmount = parseUnits(sendAmount.toString(), TOKEN_DECIMALS)

      const amountsTotal = parsedAmounts.reduce((acc, amount) => acc + amount, 0n)

      await checkAllowance(owner, parsedSendAmount + amountsTotal)
      modalStore.confirmOpen = true
      const result = await writeContract(config, {
        abi: stabilizeAbi,
        address: STABILIZER_ADDRESS,
        functionName: 'stabilizeMultiple',
        args: [parsedAmounts, parsedSendAmount]
      })
      modalStore.confirmOpen = false
      addTransaction(result)
      await waitForTransactionReceipt(config, {
        hash: result
      })
      accountStore.reload()
    } catch (e) {
      console.error(e)
    } finally {
      modalStore.confirmOpen = false
      removeTransaction()
    }
  }

  async function combineInscriptions(owner: Address, amounts: bigint[]) {
    try {
      const parsedAmounts = amounts.map((amount) => parseUnits(amount.toString(), TOKEN_DECIMALS))

      const amountsTotal = parsedAmounts.reduce((acc, amount) => acc + amount, 0n)

      await checkAllowance(owner, amountsTotal)
      modalStore.confirmOpen = true
      const result = await writeContract(config, {
        abi: stabilizeAbi,
        address: STABILIZER_ADDRESS,
        functionName: 'combineAndStabilize',
        args: [parsedAmounts]
      })
      modalStore.confirmOpen = false
      addTransaction(result)
      await waitForTransactionReceipt(config, {
        hash: result
      })
      accountStore.reload()
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
        abi,
        address: TOKEN_ADDRESS,
        functionName: 'transfer',
        args: [to, amount],
        account: from
      })
      modalStore.confirmOpen = false
      addTransaction(result)
      await waitForTransactionReceipt(config, {
        hash: result
      })
      accountStore.reload()
    } catch (e) {
      console.error(e)
    } finally {
      modalStore.confirmOpen = false

      removeTransaction()
    }
  }

  return { stabilizeInscription, generateInscriptions, combineInscriptions, sendTokens }
}
