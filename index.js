const express = require("express")
const app = express()

app.use(express.static("public/"))

//app.get("/",(req,res) => {
//  console.log("/")
//})

app.listen(8000,()=>{
  console.log("Servidor aberto em 8000")
})
