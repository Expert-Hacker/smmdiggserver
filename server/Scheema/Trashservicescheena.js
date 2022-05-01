const mongoose= require('mongoose');

const Trashervicescheema= new mongoose.Schema({

          
            service:{
                type:String,
                required:false
            },
            name:{
                type:String,
                required:false
            },
            category:{
                type:String,
                required:false
            },
            rate:{
                type:Number,
                required:false
            },
            ID:{
                type:Number,
                required:false
            },
            min:{
                type:Number,
                required:false
            },
            max:{
                type:Number,
                required:false
            },
            type:{
              type:String,
                required:false            

            },
            desc:{
                type:String,
                required:false
            },
            dripfeed:{
                type:Number,
                required:false
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
   
})
const Trashservice= mongoose.model("Trashservice",Trashervicescheema)

module.exports=Trashservice;