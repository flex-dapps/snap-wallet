// import sdk


// -------- utility functions -------------

export function getWallet(client){
    let w = localStorage.getItem('bnbwallet')
    if (w) {
        console.log('private key', JSON.parse(w).privateKey)
        client.setPrivateKey(JSON.parse(w).privateKey);
    } else {
        // create wallet
        w = client.createAccount();
        localStorage.setItem('bnbwallet', JSON.stringify(w))
        // connect to client (maybe)
        client.setPrivateKey(JSON.parse(w).privateKey);
    }
    return w
}

export async function getTokenBalance(client, address, symbol){
    try {
        let output;
        const b = await client.getBalance(address)
        b.map((bal) => {
            if(bal.symbol === symbol){
                output = bal.free;
            }
        })
        return output;
    } catch (e) {
        return -1
    }
}