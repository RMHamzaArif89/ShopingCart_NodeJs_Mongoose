const express=require('express')
const router=express.Router()
const path=require('path')
const bodyParser=require('body-parser')
const multer=require('multer')

//set the 
router.use(express.urlencoded({extended:false}))
router.use(express.json())


//require the games cart Schema

const game=require('../model/form')

router.get('/form',(req,res)=>{
    res.render('form',{title:'Form|Page'})
})

//created the img file upload structure
const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "upload")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      return cb(null,Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage:Storage })


router.post('/postForm',upload.single('img'),async(req,res)=>{
  try{
    const data= new game({
        name:req.body.name,
        price:req.body.price,
        detail:req.body.detail,
        img:req.file.filename

    })
    await game.create(data)
    
    res.redirect('/home')
  }
  catch(err){
    res.status(400).send(err) 
 }


})


router.get('/home',async(req,res)=>{
    const Data=await game.find({})
    res.render('home',{title:'Home|Page',Data})
})





module.exports=router;