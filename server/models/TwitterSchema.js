var zangoose=require('mongoose');
var Schema= zangoose.Schema;
var Twitter=new Schema(
    {
        username:{type:String, required:true},
        password:{type:String,required:true},
        image:String,
        background:String,

        tweets:
            [{
                message: {type: String, required: true},
                image:String,
                private:String,
                date:Number,
            }]
            }
);

module.exports=zangoose.model('Tweet',Twitter);