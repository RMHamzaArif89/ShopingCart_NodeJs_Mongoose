const express=require('express')
const app=express()
const mongoose=require('mongoose')
const path=require('path')
const bodyParser=require('body-parser')
var cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const formRoute=require('./routes/form')
const Cart=require('./model/cart')
const cards=require('./model/form')

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
    store: MongoStore.create({mongoUrl:'mongodb://127.0.0.1:27017/CartGames'}),
    resave:false,
    saveUninitialized:false,
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


app.get('/add-to-cart/:id',async(req,res,next)=>{
    let _id=req.params.id
    var cart= new Cart(req.session.cart? req.session.cart:{items:{}})
   let card= await cards.findById({_id})
   
cart.add(card,card._id)
req.session.cart=cart;
res.redirect('/ShopingCart')
})






app.get('/ShopingCart',(req,res)=>{
    let cart= new Cart(req.session.cart);
    // console.log(cart.generateArray())
 res.render('ShopingCart',{cart:cart.generateArray()})
    
})



//reduce the cart item quanity
app.get('/reduce/:id',(req,res)=>{
    let _id=req.params.id
    let cart= new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceOne(_id)
    req.session.cart=cart;
    res.redirect('/ShopingCart')
})




app.listen(5000,()=>{
    console.log('port is listening')
})