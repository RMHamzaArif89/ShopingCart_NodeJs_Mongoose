const express=require('express')
const app=express()
const mongoose=requir('mongoose')
const path=require('path')
const bodyParser=require('body-parser')
var cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const formRoute=require('./routes/form')

const game=require('./model/form')


//require the mongoose connection
require('./db/conn')


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())


//set the static path
app.use('static',express.static('static'))
//for images upload file static
app.use(express.static('upload'))


//store the session
app.use(session({
    secret:'rmhamzaarif89',
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie:{maxAge:180 * 60 * 1000}
}))
app.use((req,res,next)=>{
res.locals.session=req.session;
next();

})

app.set('view engine','ejs')
app.set('views','views')


//formRoute
app.use(formRoute)


app.get('/add-to-cart/:id',(req,res)=>{
    let id=req.params._id
    
})





app.listen(5000,()=>{
    console.log('port is listening')
})