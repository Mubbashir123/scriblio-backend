const mongoose=require("mongoose");

const {Schema}=mongoose;

const BoardSchema=new Schema(
    {
        title:{
            type:String,
            trim:true,
            default:"Untitled"
        },
        elements:{
            type:Array,
            default:[]
        },
        owner:{
            type:String,
            required:true
        },
        
    },
    {timestamps:true}
)
module.exports=mongoose.model("Board",BoardSchema);