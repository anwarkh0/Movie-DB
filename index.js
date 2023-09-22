const express = require("express")
const app = express()
app.get("/test", (req,res)=>{
res.json({status:200, message:"ok"})
})
app.get("/time",(req,res)=>{
const data = new Date()
const hours = data.getHours()
var minutes = data.getMinutes();
res.json({status:200, message:`${hours}:${minutes}`})
})
app.listen(3000)
