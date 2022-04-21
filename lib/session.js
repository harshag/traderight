import { KiteConnect } from "kiteconnect/lib"

var apiKey = process.env.KITE_API_KEY
var secretKey = process.env.KITE_API_SECRET
var accessToken = process.env.KITE_ACCESS_TOKEN

var kc = new KiteConnect({api_key: apiKey})

export function isSessionValid() {
    var user = kc.getProfile()
}