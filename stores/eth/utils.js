var ethers = require('ethers');

export async function sendTokenTx(to, value, bytes = '0x') {
  const tx = c['transfer(address,uint256,bytes)'](to, value, bytes, { //this file
      gasPrice: ethers.utils.parseUnits('1', 'gwei'), // default on xDAI
      // gasLimit: ethers.utils.bigNumberify(500000).toHexString(),
      nonce: nonce
  })
  tx.then(async r => { //thisfile
      await r.wait()
      dismiss()
      state.assist.notify('success', txMessages.txConfirmed())
  })
}

export async function getTokenBalance(contract, address) {
    try {
        const b = await contract.balanceOf(address)
        return b.toNumber()
    } catch (e) {
        return -1
    }
}

export async function getEthbalance() {
    wallet.ethBalance = ethers.utils.formatEther(
      await state.provider.getBalance(wallet.address)
    )
}

export function getTokenContract(address, abi, provider, burner) {
  const c = new ethers.Contract(address, abi, provider)
  // connect our burner account with the contract so we can send txs
  return c.connect(burner)
}

export function getWallet(provider) {
    let w = localStorage.getItem('wallet')
    if (w) {
      w = new ethers.Wallet(JSON.parse(w).signingKey.privateKey, provider)
    } else {
      w = ethers.Wallet.createRandom()
      localStorage.setItem('wallet', JSON.stringify(w))
      w = w.connect(provider)
    }
    return w
}