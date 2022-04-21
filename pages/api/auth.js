
import { KiteConnect } from "kiteconnect/lib"

var apiKey = process.env.KITE_API_KEY
var secretKey = process.env.KITE_API_SECRET

var options = {
    api_key: apiKey,
    debug: false
}
var kc = new KiteConnect(options)

export default function handler(req, res) {
    var requestToken = req.query.request_token
    kc.generateSession(requestToken, secretKey)
    .then(function(response) {
        console.log("Authenticated")
        process.env.KITE_ACCESS_TOKEN = response.access_token
        kc.setSessionExpiryHook = function(res) {
            res.redirect("/api/login")
        }
        res.redirect("/")
    })
    .catch(function(err){
        console.log(err)
    })
}
