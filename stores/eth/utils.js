

export async function sendTokenTx(to, value, bytes = '0x') {
    const c = wallet.tokenContract.connect(wallet.burner) // this file
    const nonce = await state.provider.getTransactionCount(wallet.address) //this file
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