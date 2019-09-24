const html = require('choo/html')
const css = require('sheetify')

const folderSvgPath = 'm475 101.585938h-182.875c-14 .003906-26.832031-7.808594-33.25-20.25l-25.75-49.625c-10.722656-20.738282-32.15625-33.71875-55.5-33.628907h-115.125c-34.511719.015625-62.484375 27.988281-62.5 62.5v349.503907c.015625 34.511718 27.988281 62.484374 62.5 62.5h412.5c34.511719-.015626 62.484375-27.988282 62.5-62.5v-246c-.015625-34.511719-27.988281-62.492188-62.5-62.5zm-412.5-78.375h115.125c14-.011719 26.832031 7.808593 33.25 20.25l25.75 49.621093c1.597656 2.996094 3.394531 5.875 5.375 8.628907h-217v-40.878907c.003906-20.726562 16.773438-37.546875 37.5-37.621093zm450 386.996093c-.058594 20.6875-16.816406 37.441407-37.5 37.5h-412.5c-20.683594-.058593-37.441406-16.8125-37.5-37.5v-283.621093h254.875c1.226562.023437 2.449219-.144532 3.625-.5 2.902344.394531 5.820312.605468 8.75.625h182.75c20.683594.058593 37.441406 16.8125 37.5 37.5zm0 0'
const TITLE = 'FLEXBUXX'
const snapLogo = '../assets/snap_logo_whiteBG.png'
const bnbSymbol = '../assets/binance-coin-logo-png-transparent.png'


module.exports = view

function view(state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  
  const styles = css`
  section {
    background-color: whitesmoke;
  }

  .header {
      padding-top: 2rem;
      padding-bottom: 1rem;
      margin: auto;
      width: 80%;
      font-size: 3.5rem;
      background-color: whitesmoke;
      border-bottom: 1px solid black;
    }
    
    
    .tokenName {
      font-size: 1.1rem;
    }
    
    .noTokens {
      font-size: 1.1rem;
      margin: auto;
    }

    .subHeading {
      padding-left: 2%;
      font-size: 2rem;
    }
    
    .list {
      padding-bottom: 5%;
      padding-top: 5%;
      margin: auto;
      font-size: 1.5rem;
      border-bottom: 1px solid black;
      width: 80%;
      line-height: 2.5rem;
    }

    .footer {
      text-align: center;
    }
    
    .logo {
      margin: auto;
      width: 65%;
    }
    
    .symbol {
      height: 2.5rem;
      padding-right: 0.5rem;
      padding-left: 0.5rem;
    }
    
    .amt {
      color: #333;
    }

    .about {
      font-size: 1.5rem;
      color: #333;
      margin: auto;
    }

    .loading {
      width: 35%;
      margin: auto;
      -webkit-animation: fade 1s alternate infinite;
      animation: fade 1s alternate infinite;
      display: block;
    }
    
    @-webkit-keyframes fade {
      0% {
        opacity: 1;
      }
      
      100% {
        opacity: 0;
      }
    
    }
    
    @keyframes fade {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    
    
    .button {
      color: #f0b90b;
      box-sizing: border-box;
      text-decoration: none;
      background-color: white;
      border: #f0b90b 3px solid;
      display: flex;
      justify-content: center;
      font-size: 3.5rem;
      width: 70vw;
      margin: 1rem;
    }
    
    .loadBEP2Button {
      color: #333;
      border-style: hidden;
      width: 20%;
      margin: auto;
    }
    
    .disabled {
      opacity: 0.5;
    }
    .disabled:hover,
    .disabled:active {
      background: unset;
      color: unset;
    }
    `
    
    const LOADING_ANIMATION = html`
      <img class="loading" src=${bnbSymbol} />
    `

  // const bep2 = state.wallet.tokenBalances;

  console.log('showAllBEP2', state.wallet.showAllBEP2);

  const bep2 = [
    {
      symbol: 'blah-0',
      free: 550,
  },
  {
    symbol: 'blah-1',
    free: 550,
  },
  {
    symbol: 'blah-2',
    free: 550,
  },
  {
    symbol: 'blah-3',
    free: 550,
  },
  {
    symbol: 'blah-4',
    free: 420,
  },
  {
    symbol: 'blah-5',
    free: 420,
  },
  {
    symbol: 'blah-6',
    free: 420,
  },
]

  function toggleExpansion(){
    state.wallet.showAllBEP2 = !state.wallet.showAllBEP2;
    emit('render');
  }

  const TOGGLE_MANY_BEP2 = html`
    <button class="loadBEP2Button pa1" onclick=${() => {toggleExpansion()}}>
      ${state.wallet.showAllBEP2 ? '↑' : '↓'}
    </button>
  `

  const ABOUT_TEXT = html`
    <div
    class="about flex justify-center items-center flex-column w-80 pr4 pl4 tc"
    >
      Snap is a browser-based *burner* wallet on Binance Chain, where you can send and recieve BNB or BEP2 tokens. 
    </div>
    <div class="block flex flex-column pt4 tc black">
      <p>binance X flexdapps 👊</p>
    </div>
    `
  // code snippet for displaying the snap logo instead.
  //   <div class="justify-center items-center w-100 pr4 pl4 mb4 tc">
  //     <img class="w-40" src=${snapLogo} />
  //   </div>

  const ALL_BEP2 = html`
  <div>
    ${bep2.map((token, i) => {
      if(i>=4){
        return html`
        <div class="token w-100 flex flex-row justify-around">
          <div class="w-33">
            ${token.symbol}
          </div>
          <div class="amt w-33">
            ${Number(token.free).toFixed(2)}
          </div>
        </div>
      `
      }
    })}
  </div>
  `

  const BEP2_LIST = html`
    <div class="list flex flex-column">
    <div class="tokenName gray">BEP2 tokens:</div>
    ${bep2.map((token, i) => {
      if(i<4){
        return html`
        <div class="token w-100 flex flex-row justify-around">
          <div class="w-33">
          ${token.symbol}
          </div>
          <div class="amt w-33">
          ${Number(token.free).toFixed(2)}
          </div>
        </div>
        `
      }
      })}
      ${state.wallet.showAllBEP2 ? ALL_BEP2 : ''}
      ${TOGGLE_MANY_BEP2}
    </div>
  `

  const NO_BEP2_TOKENS = html`
    <div class="list flex flex-column">
      <div class="noTokens gray">
      <div class="flex center">
        <svg class=" flex center" height="20pt" 
        viewBox="-18 -49 573.33331 573" 
        width="20pt" xmlns="http://www.w3.org/2000/svg"><path d="m475 101.585938h-182.875c-14 .003906-26.832031-7.808594-33.25-20.25l-25.75-49.625c-10.722656-20.738282-32.15625-33.71875-55.5-33.628907h-115.125c-34.511719.015625-62.484375 27.988281-62.5 62.5v349.503907c.015625 34.511718 27.988281 62.484374 62.5 62.5h412.5c34.511719-.015626 62.484375-27.988282 62.5-62.5v-246c-.015625-34.511719-27.988281-62.492188-62.5-62.5zm-412.5-78.375h115.125c14-.011719 26.832031 7.808593 33.25 20.25l25.75 49.621093c1.597656 2.996094 3.394531 5.875 5.375 8.628907h-217v-40.878907c.003906-20.726562 16.773438-37.546875 37.5-37.621093zm450 386.996093c-.058594 20.6875-16.816406 37.441407-37.5 37.5h-412.5c-20.683594-.058593-37.441406-16.8125-37.5-37.5v-283.621093h254.875c1.226562.023437 2.449219-.144532 3.625-.5 2.902344.394531 5.820312.605468 8.75.625h182.75c20.683594.058593 37.441406 16.8125 37.5 37.5zm0 0"/>
        </svg>
      </div>
      No BEP2 tokens in wallet!
      </div>
    </div>
  `


  const WALLET_CONTROLS = html`
    <div
      class="actions flex justify-center items-center flex-column w-100 pr4 pl4 tc"
    >
      <a class="button pa2" href="/get">Get</a>
      <a class="button pa2" href="/send">Send</a>
    </div>
    <div class="block flex flex-column pt4 tc black">
      <p>binance X flexdapps 👊</p>
    </div>
  `


  const WALLET =  html`
    <div class="wallet-status mt5 pr4 pl4">
      <div class="header">
        BNB:
        <img class="symbol" src=${bnbSymbol} />
        ${Number(state.wallet.BNBBalance).toFixed(2) || 0}
      </div>
      ${(bep2.length > 0) ? BEP2_LIST : NO_BEP2_TOKENS}
    </div>
    ${state.wallet.showAllBEP2 ? ABOUT_TEXT : WALLET_CONTROLS}
  `;

  console.log('state.wallet.init', state.wallet.init)

  return html`
    <section class="flex flex-column justify-between center">
        ${state.wallet.init ? WALLET : LOADING_ANIMATION}
    </section>
  `
}