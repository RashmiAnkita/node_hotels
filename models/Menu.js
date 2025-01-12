const mongoose = require('mongoose');
const menuItemSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required : true,
    },
    price:{
        type: Number,
        required : true,
        default: 2,
    },
    taste:{
        type: String,
        enum : ['sweet','spicy','bitter','sour'],
        required : true,
    },
    is_drink:{
        type: Boolean,
        default : false,
    },
    ingredients:{
        type: [String],         // Array of object
        default : [],
    },
    num_sales:{
        type: Number,
        default : 0,
    }
})
const menuItem = mongoose.model('menuItem', menuItemSchema);
module.exports = menuItem;
