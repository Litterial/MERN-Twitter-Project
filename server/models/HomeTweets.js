var zangoose=require('mongoose');
var Schema= zangoose.Schema;
var Public_Twitter=new Schema(
    {
        tweets: [{
            username:String,
            id:String,
            message: {type: String, required: true},
            image: String,
            private: String,
        }]
    }


);

module.exports=zangoose.model('Home Tweet',Public_Twitter);