import mongoose from "mongoose";
const { Schema } = mongoose
const { ObjectId } = Schema

// for description in productSchema
// const descriptionSchema = new Schema({
//     content:{
//         type: String,
//         required: true,
//     },
//     brand: {
//         type: String,
//     },
//     scent: {
//         type: String,
//     },
//     gender: {
//         type: String,
//     },
// });

// for image in productSchema
// const imageSchema = new Schema({
//     url: {
//         type: String,
//     },
//     imagePublicId: {
//         type: String,
//     }
// });

// for productSchema
// const productSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 160,
//     },
//     slug: {
//         type: String,
//         lowercase: true,
//     },
//     description: [descriptionSchema],
//     image: [imageSchema],
//     price: {
//         type: Number,
//         required: true,
//     },
//     category: {
//         type: ObjectId,
//         ref: "Category",
//         required: true,
//     },
//     quantity: {
//         type: Number,
//     },
//     sold:{
//         type: Number,
//         default: 0,
//     },
//     isAvailable: {
//         type: Boolean,
//         default: true,
//     },
//     shipping:{
//         type: Boolean,
//         default: false,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// },
//     { timestamps: true}
// );

const productSchema = new Schema(
    {
      name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 160,
      },
      slug: {
        type: String,
        lowercase: true,
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        trim: true,
        required: true,
      },
      category: {
        type: ObjectId,
        ref: "Category",
        required: true,
      },
      quantity: {
        type: Number,
      },
      sold: {
        type: Number,
        default: 0,
      },
      images: [{
        url: {
          type: String,
        },
        imagePublicId: {
          type: String,
        }
      }], 
      isAvailable: {
        type: Boolean,
        default: true,
      },
      shipping: {
        type: Boolean,
        default: false,
      },
      ratings:[{
        type: ObjectId,
        ref: "Rating"
      }]
  
    },
    { timestamps: true }
  );

export default mongoose.model("Product", productSchema);