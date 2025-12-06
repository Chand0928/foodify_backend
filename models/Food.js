const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image_url: String,
    category: String
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

foodSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

foodSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Food', foodSchema);
