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

export async function getBalance(client, address, symbol){
    try {
        let output;
        const b = await client.getBalance(address)
        b.map((bal) => {
            if(bal.symbol === symbol){
                output = Math.trunc(bal.free);
            }
        })
        return output;
    } catch (e) {
        return -1
    }

    // client.getBalance(address).then((b) => {
    //     b.forEach(bal => {
    //         if(bal.symbol === symbol){
    //             // console.log('bal', bal)
    //             output = bal
    //         }
    //     })
    //     console.log('output', output)
    //     return output;
    // })
}