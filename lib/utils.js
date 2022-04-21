import { KiteConnect } from "kiteconnect/lib"
import { KiteTicker } from "kiteconnect/lib"

var apiKey = process.env.KITE_API_KEY
var accessToken = process.env.KITE_ACCESS_TOKEN

export function getKiteInstance() {
    var kc = new KiteConnect({
        api_key: apiKey,
        access_token: accessToken
    })

    return kc
}

export function getKiteTickerInstance() {
    var kt = new KiteTicker({
        api_key: apiKey,
        access_token: accessToken,
        reconnect: true
    })

    return kt
}