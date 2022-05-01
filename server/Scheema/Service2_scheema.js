const mongoose= require('mongoose');

const Service2_scheema= new mongoose.Schema({

          
            serviceNum:{
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
            custom1:{
                type:String,
                required:false
            },
            custom2:{
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
const Osservice = mongoose.model("Osservice",Service2_scheema)

module.exports=Osservice;