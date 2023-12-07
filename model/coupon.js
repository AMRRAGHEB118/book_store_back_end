const { Schema, model} = require('mongoose');

const couponSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required'],
    }
})

const couponModel = model('Coupon', couponSchema);

module.exports = couponModel;