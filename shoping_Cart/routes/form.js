const express=require('express')
const router=express.Router()


router.get('/form',(req,res)=>{
    res.render('form')
})

router.post('/postForm',upload.single('img'),async(req,res)=>{
  try{
    const data=await new Schema({
        name:req.body.name,
        price:req.body.price,
        detail:req.body.detail,
        img:req.file.filename

    })
    res.redirect('/home')
  }
  catch(err){
    res.status(400).send(err) 
 }

 
})





module.exports=router;