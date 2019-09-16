const html = require('choo/html')
const css = require('sheetify')
const Tone = require('tone')

const TITLE = 'TI-83'


module.exports = (state, emit) => {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const style = css`
    .phat-caret {
      width: 2rem;
      height: 4rem;
      background: whitesmoke;
    }

    .keypad div button,
    .keypad div span {
      height: 6rem;
      font-color: black;
    }

    .proceed {
      background: #f0b90b80;
      color: #333;
      margin-bottom: 1rem;
      margin-right: 0.5rem;
    }

    .bnb {
      margin-left: 10px;
      margin-right: 10px;
      padding: 10px;
      color: #333;
      font-size: 1.5rem;
    }
    .currency {
      margin-left: 10px;
      margin-right: 10px;
      padding: 10px;
      color: #333;
    }

    .balance {
      color: #333;
      opacity: 0.8;
      font-size: 1rem;
    }
    
  `

  const dist = new Tone.Distortion(0.2).toMaster()
  const noise = new Tone.Noise('pink').connect(dist)
  const synth = new Tone.Synth().toMaster()
  synth.volume.value = 0

  // looking back at this code gives me chills, sorry
  // @todo set this up through an array and a .map function instead of this
  // gross, hardcoded mess
  return html`
    <section class="flex flex-column pa0 items-center tc justify-between">
      <div
        class="flex tc f-subheadline pa5 items-center ${Number(
          state.calculate.input
        ) >= Number(state.wallet.BNBBalance)
          ? 'red'
          : 'green'}"
      >
        ${state.calculate.formattedInput !== '0'
          ? state.calculate.formattedInput
          : ''}
        <span class="phat-caret"></span>
      </div>
      <span class="flex flex-row">
        ${state.wallet.allBalances.map((token, i) => {
          return html`
            <button class="w-33 currency" onclick=${() => {
                emit('selectCurrency', token.symbol)
              }}
            >${token.symbol}</button>
          `
        })}
      </span>
      <span class="flex flex-row">
        ${state.wallet.allBalances.map((token, i) => {
          if(token.symbol === state.calculate.currencySymbol){
            console.log('balance', token)
            return html`
              <span class="balance">${Number(token.free).toFixed(2)}</span>
            `
          }
        })}
      </span>
      <div class="keypad w-100 flex flex-column f1">
        <div class="flex flex-row">
          <button
            class="w-33"
            onclick=${() => {
              synth.triggerAttackRelease('A4', '8n')
              emit('numPress', 1)
            }}
          >
            1
          </button>
          <button
            class="w-33"
            onclick=${() => {
              synth.triggerAttackRelease('B4', '8n')
              emit('numPress', 2)
            }}
          >
            2
          </button>
          <button
            class="w-33"
            onclick=${() => {
              synth.triggerAttackRelease('C5', '8n')
              emit('numPress', 3)
            }}
          >
            3
          </button>
        </div>
        <div class="flex flex-row">
          <button
            class="w-33"
            onclick=${() => {
              synth.triggerAttackRelease('D5', '8n')
              emit('numPress', 4)
            }}
          >
            4
          </button>
          <button
            class="w-33"
            onclick=${() => {
              synth.triggerAttackRelease('E5', '8n')
              emit('numPress', 5)
            }}
          >
            5
          </button>
          <button
            class="w-33"
            onclick=${() => {
              synth.triggerAttackRelease('F5', '8n')
              emit('numPress', 6)
            }}
          >
            6
          </button>
        </div>
        <div class="flex flex-row">
          <button
            class="w-33"
            onclick=${() => {
              synth.triggerAttackRelease('G5', '8n')
              emit('numPress', 7)
            }}
          >
            7
          </button>
          <button
            class="w-33"
            onclick=${() => {
              synth.triggerAttackRelease('A5', '8n')
              emit('numPress', 8)
            }}
          >
            8
          </button>
          <button
            class="w-33"
            onclick=${() => {
              synth.triggerAttackRelease('B5', '8n')
              emit('numPress', 9)
            }}
          >
            9
          </button>
        </div>
        <div class="flex flex-row">
          <button
            class="w-33"
            onclick=${() => {
              synth.triggerAttackRelease('G5', '8n')
              emit('numPress', 'DEL')
            }}
          >
            DEL
          </button>
          <button
            class="w-33"
            onclick=${() => {
              synth.triggerAttackRelease('C4', '8n')
              emit('numPress', '0')
            }}
          >
            0
          </button>
          <span class="w-33"></span>
        </div>
        <div class="flex flex-row">
          <button class="w-33" onclick=${() => emit('replaceState', '/')}>
            BACK
          </button>
          <span class="w-33"></span>
          <button
            class="w-34 proceed"
            onclick=${() => {
              emit('nextTx.setPrice', state.calculate.input)
              state.afterCalculate(state.calculate.input)
            }}
          >
            GO
          </button>
        </div>
      </div>
    </section>
  `
}




// ${state.wallet.tokenBalances.map((token, i) => {
//   return html`
//   <button class="w-33 currency" onClick=${() => {
//     emit('selectCurrency', token.symbol)
//   }}
//   >${token.symbol}</button>
//   `
// })}