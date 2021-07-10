const mongoose=require('mongoose');

const Sabrichema = new mongoose.Schema({
    codigo:{
       type:Number
     
    },
    nombre:{
        type:String
        //required:true
    },
    gramos:{
        type:Number
        //required:true
    },
    precio:{
        type:Number
    },
    fecha:{
         type:Date
        }
})

const Sabritas = mongoose.model('Sabritas', Sabrichema);

module.exports = Sabritas;