const css = require('sheetify')
const choo = require('choo')
require('babel-polyfill')

css('tachyons')
css('./assets/main.css')

const app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use((state, emitter) => {

  // -- BNB TESTNET API --
  state.JSON_RPC_URL = 'https://testnet-dex.binance.org/'
  // state.TOKEN_ADDRESS // dont need
  // state.NETWORK_ID // dont need

  // -- XDAI TEST CONTRACTS --
  // state.JSON_RPC_URL = 'https://dai.poa.network/'
  // state.TOKEN_ADDRESS = '0x5eb7e67ec2ce404ebabafed0a79bab10d030c58a'
  // state.NETWORK_ID = 100

  // -- GOERLI CONTRACTS --
  // state.JSON_RPC_URL = 'https://xdai.flexdapps.com:7361/'
  // state.TOKEN_ADDRESS = '0xe0728a9d55ebd03bfcc6e9faa59e6dfe96741636'
  // state.NETWORK_ID = 10

  // -- LOCAL TEST CONTRACTS
  // state.JSON_RPC_URL = 'https://localhost:9009'
  // state.TOKEN_ADDRESS = '0xDBA081ff3cc5921a784A788Cf5a49Dd7A8F9B83F'
  // state.NETWORK_ID = 5777

  // state.CURRENCY_SYMBOL = '៛'
  state.CURRENCY_SYMBOL = '◆'
})
//animation: loading 5s infinite;
app.use(require('./stores/events'))
// app.use(require('./stores/eth/utils'))
app.use(require('./stores/eth/provider'))
app.use(require('./stores/bnb/client'))

app.use(require('./stores/wallet'))
app.use(require('./stores/calculate'))
app.use(require('./stores/scanner'))

// should glob the dapps folder
app.use(require('./stores/dapps/config'))

// @todo fix
// for (let dapp of dapps) {
//   const path = './stores/dapps/' + dapp
//   app.use(require(path))
// }

// app.use(require('./stores/dapps/vip'))
// app.use(require('./stores/dapps/king'))

app.route('/', require('./views/main'))
app.route('/get', require('./views/get'))
app.route('/send', require('./views/send'))
app.route('/confirm', require('./views/confirm'))
app.route('/calculate', require('./views/calculate'))

// there needs to be something here which globs the `dapps` folder to grab
// all the extra files - it should probably have a subroute too like /dapps/my-dapp
// remove these lines if you don't want to have any custom dapps
app.route('/dapps', require('./views/dapps/index'))
app.route('/dapps/vip', require('./views/dapps/vip'))
app.route('/dapps/king', require('./views/dapps/king'))

const element = app.start()
document.body.appendChild(element)
