const canva = document.getElementById("canva#123")
const ctx = canva.getContext("2d")

let center = {x:canva.width*.6,y:canva.height/2}
let config = {my:300,back:"#061122",god:"#00ff00",bad:"#ff0000",base:"white",szblk:(canva.width*.07)}
let blocks = []

let next_size = 0

blocks.push({ h:50 })
blocks.push({ h:-70 })
blocks.push({ h:120 })

function draw(){
  drawBackground()
  drawBlocks()
  // OPT
  requestAnimationFrame(draw)
  // END
}

draw()

function drawBackground(){
  ctx.fillStyle = config.back
  ctx.fillRect(0,0,canva.width,canva.height)
}

function drawBase( y ){
  ctx.beginPath()
  ctx.moveTo(0,y)
  ctx.lineTo(canva.width,y)
  ctx.strokeStyle = config.base
  ctx.stroke()
}

function drawBlocks(){
  var x = center.x
  var y = center.y
  drawBase(y)
  for(var i = blocks.length - 1; i >= 0; i--){
    var block = blocks[i]
    h = normalize( block.h )
    ctx.fillStyle = h > 0 ? config.god : config.bad
    ctx.fillRect( x,y,config.szblk,h )
    x -= config.szblk
    y += h
    if(i == blocks.length - 1){
       var n = next_size * 0.1
       next_size -= n
       blocks[i].h += n
    }
  }
  status( y )
  drawBase(y)
}

function move( x ){
  next_size += x
  blocks[ blocks.length - 1 ].h += x
}
function altern(){
  blocks.push({ h:0 })
  next_size = 0
}

function status( y ){
  if(y > (center.y) ){
    ctx.fillStyle = "#00ff004d"
    ctx.fillRect(0,0,canva.width,center.y)
  } else {
    ctx.fillStyle = "#ff00004d"
    ctx.fillRect(0,center.y,canva.width,canva.height)
  }
}

function normalize(x){
  return parseInt( (x /config.my) * canva.height )
}

function rd(x, y) {
  return Math.floor(Math.random() * (y - x + 1)) + x;
}

setInterval(function(){
  move( rd(-40,40) )
},1000)

setInterval(function(){altern()},2500)
