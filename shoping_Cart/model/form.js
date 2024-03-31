//this collection will be use to find filter or search the products|data ...

const mongoose=require('mongoose')
const validator=require('validator')

const gamesSchema= new mongoose.Schema({
    //these are the names of input...name='name'
    name:{
        type:String,
        // required:true

    },
    price:{
        type:Number,
    },
    detail:{
        type:String,
    },
    img:{
        type:String,
        // unique:true
    }

})


// mongoose collection name specfied//created the new collection|table
const GamesCart= new mongoose.model("GamesCart",gamesSchema)

//export the schema that will be import in the main.js file
module.exports=GamesCart;