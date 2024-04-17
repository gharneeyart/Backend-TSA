import mongoose from 'mongoose';
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema

// Define schema
// const orderSchema = new Schema({
//     orderId: { 
//         type: String, 
//         required: true 
//     },
//     date: { 
//         type: Date, 
//         default: Date.now 
//     },
//     customerInfo: {
//         type: ObjectId,
//         ref: "User", // Reference the userSchema
//         required: true
//     },
//     paymentInfo: {
//         paymentMethod: { type: String, required: true },
//         transactionId: { type: String, required: true },
//         amount: { type: Number, required: true }
//     },
//     productDetails: [{
//         productId: {type: ObjectId,
//             ref: "Product", // Reference the productSchema
//             required: true},
//         quantity: { type: Number, required: true },
//         totalPrice: { type: Number, required: true }
//     }],
//     shippingDetails: {
//         shippingMethod: { type: String, required: true },
//         shippingAddress: { type: String, required: true },
//         expectedDeliveryDate: { type: Date, required: true },
//         trackingInfo: { type: String }
//     },
//     orderStatus: {
//         currentStatus: { type: String, required: true },
//         statusUpdateDate: { type: Date, default: Date.now },
//         notes: { type: String }
//     },
//     additionalInfo: {
//         specialInstructions: { type: String },
//         giftMessage: { type: String },
//         giftWrapRequest: { type: Boolean,
//         default: true}
//     }
// },
// {
//     timestamps: true,
// }
// );

const orderSchema = new Schema(
    {
      products: [{ type: ObjectId, ref: "Product" }],
      payment: {},
      buyer: { type: ObjectId, ref: "User" },
      status: {
        type: String,
        default: "Not processed",
        enum: [
          "Not processed",
          "Processing",
          "Shipped",
          "Delivered",
          "Cancelled",
        ],
        // enum is used for dropdown
      },
      totalAmount: {
        type: Number,
      },
      date: {
        type: Date,
        default: Date.now
      }
    },
    { timestamps: true }
  );
  

// Create model
export default mongoose.model('Order', orderSchema);
