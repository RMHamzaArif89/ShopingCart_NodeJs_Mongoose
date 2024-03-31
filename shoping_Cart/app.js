const express=require('express')
const app=express()
const path=require('path')
const bodyParser=require('body-parser')
const formRoute=require('./routes/form')

const game=require('./model/form')


//require the mongoose connection
require('./db/conn')


app.use(express.urlencoded({extended:false}))
app.use(express.json())


//set the static path
app.use('static',express.static('static'))
//for images upload file static
app.use(express.static('upload'))


app.set('view engine','ejs')
app.set('views','views')


//formRoute
app.use(formRoute)








app.listen(5000,()=>{
    console.log('port is listening')
})