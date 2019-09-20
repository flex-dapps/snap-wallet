/**
 * This is the main "state store" of the application. It attempts to contain
 * everything which is relevant to the act of actually dealing with sending
 * monies. "Monies" in this instance is the ERC223 token deployed for usage
 * with this instance of the burner wallet. Any code relating to interacting
 * with that token contract should be contained within this file.
 *
 * Any other contract interactions should be moved to a file which is specific
 * to them, under the /dapps/ folder.
 */

module.exports = store

const axios = require('axios');

// import { sendTokenTx, getTokenBalancea, getEthbalance, getTokenContract } from './eth/utils'
import { getWallet, getAccountBalance } from './bnb/utils'

const DEFAULT_STATE = {
  init: false,
  qr: null,
  allBalances: [],
  BNBBalance: 0,
  tokenBalances:[],
  address: '0x0000000000000000000000000000000000000000',
  burner: {
    signingKey: {
      privateKey: '0x0000000000000000000000000000000000000000'
    }
  },
  nextTx: {
    beforeParams: `You're sending`,
    price: -1,
    joiningStatement: '',
    param: '',
    afterParams: ``,
    cta: `Swipe to confirm`
  },
  afterConfirm: () => {},
  afterSend: () => {}, // allow specification of a callback after send
  refreshFuncs: [] // allow addition of functions which "refresh" the app
}

async function store(state, emitter) {


  initWallet();

  
  async function initWallet(){
    state.wallet = Object.assign({}, DEFAULT_STATE)
    let wallet = state.wallet // convenience
    
    // creates a wallet if there is not already one in localstorage
    wallet.burner = await getWallet(state.client)
    wallet.address = JSON.parse(wallet.burner).address // for convenience

    // get all balances
    wallet.allBalances = await getAccountBalance(state.client, wallet.address)
    
    // get BNB balance
    await wallet.allBalances.map((bal) => {
      if(bal.symbol === "BNB"){
        wallet.BNBBalance = bal.free;
      }
    })
  
    // get BEP2 balances
    await wallet.allBalances.map((bal) => {
      if(bal.symbol != "BNB"){
        wallet.tokenBalances.push(bal);
      }
    })
    
    console.log('bnbClient', state.client)
    console.log('wallet', state.wallet)
    
    // flag wallet as initialised, then re-render
    state.wallet.init = true;
    emitter.emit('render');
  }


  // a whole bunch of events for you to configure the 'confirm' screen in the
  // wallet. YOU DON'T HAVE TO USE THE CONFIRM SCREEN, this is just a handy
  // little set of helpers if you do
  // for an example of how this looks, set play around with the /vip dapp
  // will probably rip this out as i don't think the confirm dialog should be a
  // default part of the application, dapps can create one if they like
  emitter.on('nextTx.setBeforeParams', s => (state.wallet.nextTx.beforeParams = s))
  emitter.on('nextTx.setPrice', s => (state.wallet.nextTx.price = s))
  emitter.on(
    'nextTx.setJoiningStatement',
    s => (wallet.nextTx.joiningStatement = s)
  )
  emitter.on('nextTx.setParam', s => (state.wallet.nextTx.param = s))
  emitter.on('nextTx.setAfterParams', s => (state.wallet.nextTx.afterParams = s))
  emitter.on('nextTx.setCta', s => (state.wallet.nextTx.cta = s))
  emitter.on('nextTx.confirm', () => state.wallet.afterConfirm())
  emitter.on('nextTx.sent', () => state.wallet.afterSend())

  // send the wallet's tokens (this is hardcoded to an ERC223 at the moment)
  // @todo add a function param so that methods other than tokenFallback can be
  // called on the receiving contracts
  emitter.on(
    'wallet.sendTokens',
    async (to, value, asset, bytes = '0x', messages, error) => {
      // handle not enough cash here
      if (Number(value) > Number(state.wallet.BNBBalance)) {
        if (error && typeof error === 'function') error()
        return
      }
      sendTokenTransaction(state.wallet.address, to, value, asset, "outgoing tx")
      emitter.emit('nextTx.sent')
    }
  )

  state.wallet.refreshFuncs.push(getAccountBalance)

  emitter.on('wallet.addRefreshFunc', f => {
    state.wallet.refreshFuncs.push(f)
  })

  async function sendTokenTransaction(addrFrom, addrTo, value, asset, message){

    const httpClient = axios.create({ baseURL: state.JSON_RPC_URL });
    const sequenceURL = `${state.JSON_RPC_URL}api/v1/account/${addrFrom}/sequence`;

    httpClient
      .get(sequenceURL)
      .then((res) => {
          // const sequence = res.data.sequence || 0
          return state.client.transfer(addrFrom, addrTo, value, asset)
      })
      .then((result) => {
              console.log(result);
          if (result.status === 200) {
              console.log('success', result.result[0].hash);
          } else {
              console.error('error', result);
          }
      })
      .catch((error) => {
          console.error('error', error);
      });
  }

}
