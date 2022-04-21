import { getKiteInstance, getKiteTickerInstance } from "../../lib/utils"

const kc = getKiteInstance()
const kt = getKiteTickerInstance()

var initialTargetPositions = []

export default async function handler(req, res) { 
  
  initialTargetPositions = await getTargetPositions()
  
  kt.disconnect() //Close existing connection
  connectWS()
  
  return res.json({})

}

async function getAllPositions() {
  const { net } = await kc.getPositions()

  return net
}

async function getTargetPositions() {
  const allPositions = await getAllPositions()
  const targetPositions = allPositions.filter(position => position.exchange === "NFO" && position.instrument_token !== 8980226)

  return targetPositions
}

function connectWS() {
  kt.connect()
  kt.on('ticks', onTicks);
  kt.on('connect', subscribe);
  kt.on('disconnect', onDisconnect);
  kt.on('error', onError);
  kt.on('close', onClose);
  kt.on('order_update', onTrade);
}

async function onTicks(ticks) { 
  var latestTick = {}
  var pnl = []
  var totalPnl = 0
  const targetPositions = initialTargetPositions
  
  for (const position in targetPositions) {
    var positionPnl = 0
    var currentPosition = targetPositions[position]
    latestTick = ticks.filter(tick => tick.instrument_token === currentPosition.instrument_token)[0]
    if (latestTick === undefined) {
     return
    }
    if (currentPosition.quantity == 0) {
      positionPnl = currentPosition.pnl
    }
    else if (currentPosition.quantity < 0) {
      positionPnl = (currentPosition.sell_price * currentPosition.sell_quantity) - (latestTick.last_price * currentPosition.sell_quantity)
    } else {
      positionPnl = (latestTick.last_price * currentPosition.buy_quantity) - (currentPosition.buy_price * currentPosition.buy_quantity)
    }
    pnl.push({token: currentPosition.instrument_token, pnl: positionPnl})
    totalPnl = totalPnl + positionPnl
  
  }

  console.log(totalPnl)
}

async function subscribe() {
  console.log("WebSocket connected")
  
  const positions = await getOptionPositionTokens()
	kt.subscribe(positions);
	kt.setMode(kt.modeFull, positions);
}

async function getOptionPositionTokens() {
  const filteredPositions = await getTargetPositions()
  var tokens = []
  for (const token in filteredPositions) {
    tokens.push(filteredPositions[token].instrument_token)
  }
  
  return tokens
}


/* WebSocket functions begin */
function onDisconnect(error) {
	console.log("Closed connection on disconnect", error);
}

function onError(error) {
	console.log("Closed connection on error", error);
}

function onClose(reason) {
	console.log("Closed connection on close", reason);
}

function onTrade(order) {
    console.log("Order update", order);
}

/* WS functions end */