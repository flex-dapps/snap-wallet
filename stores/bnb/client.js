module.exports = store

import BncClient from '@binance-chain/javascript-sdk'

function store(state, emitter) {
    state.client = new BncClient(state.JSON_RPC_URL)
    state.client.chooseNetwork("testnet"); // or this can be "mainnet"
    state.client.initChain()
}