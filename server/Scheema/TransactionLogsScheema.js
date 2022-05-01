let mongoose =require('mongoose');

let TransactionLogsscheema=new mongoose.Schema({
    paymentID:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    method:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        required:true
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

let TransactionLogs=mongoose.model("TransactionLogs", TransactionLogsscheema);

module.exports=TransactionLogs;