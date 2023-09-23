const express = require("express")
const app = express()
app.get("/test", (req,res)=>{
    res.status(200).json({status:200, message:"ok"})
})
app.get("/time",(req,res)=>{
    const data = new Date()
    const hours = data.getHours()
    var minutes = data.getMinutes();
    res.status(200).json({status:200, message:`${hours}:${minutes}`})
})
app.get("/hello/:id?",(req,res)=>{
    let id = req.params.id
    id?res.json({status:200, message:`Hello, ${id}`}):
    res.status(200).json({status:200, message:"Hello!"})
})
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]
app.get("/search",(req,res)=>{
    (req.query.s != undefined)?
    res.status(200).json({status:200, message:"ok", data:`${req.query.s}`}):
    res.status(500).json({status:500, error:true, message:"you have to provide a search"})
})
app.get("/movie/create", (req,res)=>{
    res.status(200).json({status:200, message:"create"})
})

app.get("/movies/read", (req,res)=>{
    res.status(200).json({status:200, data:movies})
})
app.get("/movies/update", (req,res)=>{
    res.status(200).json({status:200, message:"update"})
})
app.get("/movies/delete", (req,res)=>{
    res.status(200).json({status:200, message:"delete"})
})

app.listen(3000)
