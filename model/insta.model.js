const mongoose = require("mongoose")

const instaSchema = mongoose.Schema({
    title: {type:String,required:true},
    body: {type:String,required:true},
    device: {type:String,enum:[  "Laptop", "Tablet", "Mobile"],required:true},
    no_of_comments:{type:Number,required:true},
    userId:String,
    user:String

   


}, {
    versionKey: false
})

const InstaModel = mongoose.model("insta", instaSchema)


module.exports = {
    InstaModel
}
