# Snap: A BEP-2 enabled burner wallet for transacting Binance Coin

Snap is an open source project that brings the straight forwardness and convenience of a burner wallet to Binance Chain, allowing users to transact Binance Coin and other BEP-2 based tokens.  Snap allows you to deploy a lighting fast burner wallet as a progressive web app on iPhone and Android devices, it is easily extensible so you can build mini apps which utilise BEP-2 and Binance Chain in novel, engaging ways.


## Prerequisites

You'll need `node`, and I recommend using `yarn`.

Run `yarn` to install deps, than `yarn start` to run the app.

I recommend opening it up in a tab with the mobile UI simulator on, otherwise the notifications will look pretty janky as they rely on the detection of a mobile user agent to modify their UI.

## Tech

We've used choojs as the "framework" for the app, which gives us some pretty lightweight state and UI management capabilities.

## Commands
Command                | Description                                      |
-----------------------|--------------------------------------------------|
`$ yarn`               | Install dependencies
`$ yarn start`         | Start the development server
`$ yarn build`         | Compile progressive web app into `/dist`
