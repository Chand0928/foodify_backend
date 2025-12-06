const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
    quantity: { type: Number, default: 1 }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

cartItemSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

cartItemSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('CartItem', cartItemSchema);
