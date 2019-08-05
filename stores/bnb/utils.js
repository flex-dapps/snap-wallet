// import sdk

// -------- utility functions -------------

export function getWallet(client){
    let w = localStorage.getItem('bnbwallet')
    if (w) {
        // do nothing?

    } else {
        // create wallet
        w = client.createAccount();
        localStorage.setItem('bnbwallet', JSON.stringify(w))
        // connect to client (maybe)

    }
    return w
}

export function getBnbBalance(client, address){
    return client.getBalance(address)
}