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
      scentType: {
        type: String,
        default: "Fresh",
        enum: [
          "Fresh",
          "Cedar",
          "Citrus",
          "Floral",
          "Lemon",
          "Mush, Amber",
          "Rose",
          "Vanilla",
        ],
      },
      fragranceType: {
        type: String,
        default: "Body Spray",
        enum: [
          "Body Spray",
          "Deodorant",
          "Eau De Cologne",
          "Eau De Parfum",
          "Eau De Toilette",
          "Perfum Oil",
        ],
        
      },
      gender: {
        type: String,
        default: "Unisex",
        enum: [
          "Unisex",
          "Male",
          "Female",
        ],
      },
      brand: {
        type: String,
        default: "Adidas",
        enum: [
          "Armaf",
          "Armani",
          "Calvin Klein",
          "Dior",
          "Dolce & Gabbana",
          "Essenza",
          "Hugo Boss",
          "Giogio Armani",
          "Jimmy Choo",
          "Lataffa",
          "Mont Blanc",
          "Ralph Lauren",
          "Versace",
          "Yves Saint Laurent",
          "Zaien",
        ],
      },
      scentProfile: {
        type: String,
      },
      about: {
        type: String,
      },
      returnPolicy: {
        type: String,
        default: "NO REFUND"
      },
      usage: {
        type: String,
      },
      size: [{
        type: Number,
        default: 2.3,
        enum: [
          2.3,
          3.4,
          5.0,
          6.3,
        ],
    }],
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
      }],
      avgRating: {
        type: Number,
        default: 0,
      }
  
    },
    { timestamps: true }
  );

export default mongoose.model("Product", productSchema);