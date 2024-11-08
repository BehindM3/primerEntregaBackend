import mongoose from "mongoose";

const cartCollection = 'cart';

const cartSchema = new mongoose.Schema({
    products : {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                cant: {
                    type: Number, 
                    default: 1
                }
            }
        ],
        default: []
    },
    totalPrice: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

cartSchema.pre('findOne', function(){
    this.populate('products.product')
});

export const cartModel = mongoose.model(cartCollection, cartSchema);