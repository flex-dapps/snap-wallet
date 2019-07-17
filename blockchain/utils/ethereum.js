module.exports = store

const ethers = require('ethers')

function store(state, emitter) {
  state.provider = new ethers.providers.JsonRpcProvider(state.JSON_RPC_URL)
}

// export async function sendTokenTransaction(to, value, bytes = '0x', messages = {}) {
//   const txMessages = Object.assign(getDefaultTokenMessages(value), messages)
//   const dismiss = state.assist.notify('pending', txMessages.txSent(), -1)
//   const c = wallet.tokenContract.connect(wallet.burner)
//   const nonce = await state.provider.getTransactionCount(wallet.address)
//   const tx = c['transfer(address,uint256,bytes)'](to, value, bytes, {
//     gasPrice: ethers.utils.parseUnits('1', 'gwei'), // default on xDAI
//     // gasLimit: ethers.utils.bigNumberify(500000).toHexString(),
//     nonce: nonce
//   })
//   tx.then(async r => {
//     await r.wait()
//     dismiss()
//     state.assist.notify('success', txMessages.txConfirmed())
//   })
// }