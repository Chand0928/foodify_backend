const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    total_amount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Preparing', 'Ready', 'Completed'], default: 'Pending' },
    items: [{
        food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true } // Snapshot price at time of order
    }]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Order', orderSchema);
