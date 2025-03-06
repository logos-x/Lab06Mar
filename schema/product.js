let mongoose  = require('mongoose');

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: Number,
    imgURL: {
        type: String,
        default: ""
    },
    Category: String,
    description: {
        type: String,
        default: ""
    },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);