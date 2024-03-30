const express=require('express')
const app=require('app')


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



app.get('/form',(req,res)=>{
    res.render('form')

})



app.listen(8000,()=>{
    console.log('port is listening')
})