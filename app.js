const express = require('express')
const db = require("./database/connected")
const port = 3000;
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan');
const Artical = require('./modules/moduls');

app.set('view engine','ejs')
app.set('views', 'views')
let publicPath = path.join(__dirname,'/public')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(publicPath))

app.get('/',(req,res ,next )=> {
    
    res.render('index')
})
app.get('/form',(req,res ,next )=> {
    res.render('form')

})
app.get('/show',(req,res)=> {
    Artical.find()
    .then((result)=>{res.render("show",{myTitle: "My Show Data", myResult:result})})
    .catch((err)=>{ console.log(err)})
    
})

app.post('/form',(req,res ,next )=> {
    const artical = new Artical(req.body)
    console.log(req.body)
    artical.save()
    .then((result)=>{ res.redirect('show')})
    .catch((err)=>{ console.log(err)})
})

app.get("/:id", (req,res) => {
    let id = req.params.id
    Artical.findById(id)
    .then((result)=>{
        res.render("details",{myTitle: "Articles Details", myData : result})
    })
    .catch((err)=>{ console.log(err)})
})

app.get("/edite/:id", (req,res) =>{
    let id = req.params.id
    Artical.findById(id)
    .then((result)=>{
        res.render("edite",{myTitle: "Articles Update", myDataUpdate : result})
    })
    .catch((err)=>{ console.log(err)})
})
app.post('/edite/update/:id',(req,res ,next )=> {
    res.render(console.log("good"))
    // 
})
// .......................................

app.listen(port,()=>{
    console.log(`listen this server on port ${port}`)
})