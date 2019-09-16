const html = require('choo/html')
const css = require('sheetify')

const TITLE = 'FLEXBUXX'
const snapLogo = '../assets/snap_logo_no_opacity_cropped.png'
const bnbSymbol = '../assets/binance-coin-logo-png-transparent.png'

module.exports = view

function view(state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const styles = css`
    section {
      background-color: whitesmoke;
    }

    .header {
      text-align: center;
      padding-top: 2rem;
      padding-bottom: 1rem;
      margin: auto;
      width: 80%;
      font-size: 3.5rem;
      background-color: whitesmoke;
      border-bottom: 1px solid black;
    }

    .tokenListHeader {
      padding-bottom: 1rem;
    }

    .tokenName {
      width: 83%;
      font-size: 1.5rem;
    }

    .subHeading {
      padding-left: 2%;
      font-size: 2rem;
    }

    .list {
      padding: 5%;
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

    .button {
      font-size: 3.5rem;
      background-color: white;
      border: #f0b90b 5px solid;
      margin: 1rem;
      padding: 0.5rem 9rem;
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
  
  const bep2 = state.wallet.tokenBalances;

  return html`
    <section class="flex flex-column justify-between center pr4 pl4 pt5">
      <div class="wallet-status">
        <div class="header">
          BNB:
          <img class="symbol" src=${bnbSymbol} />
          ${Number(state.wallet.BNBBalance).toFixed(2) || 0}
        </div>
        <div class="list flex flex-column">
          <div class="tokenListHeader flex justify-center items-center">
            <div class="tokenName gray">BEP2:</div>
          </div>
          ${bep2.map((token, i) => {
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
          })}
        </div>
      </div>
      <div
        class="actions flex justify-center items-center flex-column w-100 tc"
      >
        <a class="button" href="/get">Get</a>
        <a class="button" href="/send">Send</a>
      </div>
      <div class="block flex flex-column pt4 tc black">
        <p>binance X flexdapps 👊</p>
      </div>
    </section>
  `
}

/**
 *  
 *  <div class="vip-status">
      VIP${state.vip.meVip ? '_' + state.vip.meIndex : ''}=${state.vip.meVip
        ? 'TRUE'
        : 'FALSE'}
    </div> 
 * 
◆

<div class="vip-status">
  DEBUG_BAL=${Number(state.wallet.ethBalance)
    ? Number(state.wallet.ethBalance).toFixed(5)
    : 0}
</div>


<img class="logo"
          src=${snapLogo} />


 */
