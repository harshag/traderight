
import { KiteConnect } from "kiteconnect/lib"

var apiKey = process.env.KITE_API_KEY
var accessToken = process.env.KITE_ACCESS_TOKEN

var options = {
    api_key: apiKey,
    debug: false
}
var kc = new KiteConnect(options)

export default function handler(req, res) {

//todo: make it more robust such that login page is redirected to when any api is called directly with invalid session

//   if (!accessToken) {
//       return res.redirect(kc.getLoginURL())
//   } else {
//       return res.redirect("/api/auth")
//   }

  return res.redirect(kc.getLoginURL())
}
