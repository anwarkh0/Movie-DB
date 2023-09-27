const express = require("express")
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]
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
    id?res.status(200).json({status:200, message:`Hello, ${id}`}):
    res.status(200).json({status:200, message:"Hello!"})
})

app.get("/search",(req,res)=>{
    (req.query.s != undefined)?
    res.status(200).json({status:200, message:"ok", data:`${req.query.s}`}):
    res.status(500).json({status:500, error:true, message:"you have to provide a search"})
})
app.get('/movies/add', (req,res)=>{

    let title = req.query.title
    let year = parseInt(req.query.year)
    let rating = parseFloat(req.query.rating) || 4;
    let newMovie;

    if(!req.query.title || req.query.year.length !== 4){
        res.status(403).json({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
    } else
    if(rating<0 || rating>10){
        rating =4;
    }

    newMovie = {title:title, year:year, rating:rating}

 
    movies.push(newMovie);
    res.status(200).json(movies)
    // console.log(movies)
 
})

app.get("/movies/read", (req,res)=>{
    res.status(200).json({status:200, data:movies})
})

app.get("/movies/read/by-date", (req,res)=>{
    res.status(200).json({status:200, data:movies.sort((a,b)=>(a.year<b.year?-1:1))})
})

app.get("/movies/read/by-rating", (req,res)=>{
    res.status(200).json({status:200, data:movies.sort((a,b)=>(a.rating<b.rating?-1:1))})
})
app.get("/movies/read/id/:id",(req,res)=>{
    let id = req.params.id
    if(id > 0 && id <=movies.length){
        res.status(200).json({status:200, data:movies[id-1]})
    }
    else 
    res.status(404).json({status:404, error:true, message:`the movie ${id} does not exist`})
})
app.get("/movies/read/by-title", (req,res)=>{
    res.status(200).json({status:200, data:movies.sort((a,b)=>(a.rating<b.rating?-1:1))})
})

app.get("/movies/update/:id", (req,res)=>{
    
    let id = parseInt(req.params.id)

    let title = req.query.title
    let year = parseInt(req.query.year)
    let rating = parseFloat(req.query.rating);

        if(req.query.title){
            movies[id-1].title = title
        }
        if(parseInt(req.query.year) && req.query.year.length == 4){
            movies[id-1].year = year
        }
        if(req.query.rating!==undefined && req.query.rating >= 0 && req.query.rating <= 10){
            movies[id-1].rating = rating
        }

 
    // movies.push(newMovie);
    res.status(200).json(movies)
    
})
app.get("/movies/delete/:id", (req,res)=>{
    let id = parseInt(req.params.id)
    if(!id || id < 1 || id >movies.length){
        res.status(404).json({status:404, error:true, message:`the movie ${id} does not exist`})
    }
    else{

        movies.splice(id-1, 1)
    }
    res.status(200).json(movies)
})
app.post('/movies/add', (req,res)=>{

    let title = req.body.title
    let year = req.body.year
    let rating = parseFloat(req.body.rating) || 4;
    let newMovie;

    if(!req.body.title || req.body.year.toString().length !== 4){
        res.status(403).json({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
    } else
    if(rating<0 || rating>10){
        rating =4;
    }

    newMovie = {title:title, year:year, rating:rating}

 
    movies.push(newMovie);
    res.status(200).json(movies)
})
app.put("/movies/update/:id", (req,res)=>{
    
    let id = parseInt(req.params.id)

    let title = req.body.title
    let year = parseInt(req.body.year)
    let rating = parseFloat(req.body.rating);

        if(req.body.title){
            movies[id-1].title = title
        }
        if(parseInt(req.body.year) && req.body.year.length == 4){
            movies[id-1].year = year
        }
        if(req.body.rating!==undefined && req.body.rating >= 0 && req.body.rating <= 10){
            movies[id-1].rating = rating
        }

 
    // movies.push(newMovie);
    res.status(200).json(movies)
    
})
app.delete("/movies/delete/:id", (req,res)=>{
    let id = parseInt(req.params.id)
    if(!id || id < 1 || id >movies.length){
        res.status(404).json({status:404, error:true, message:`the movie ${id} does not exist`})
    }
    else{

        movies.splice(id-1, 1)
    }
    res.status(200).json(movies)
})

app.listen(3000)
