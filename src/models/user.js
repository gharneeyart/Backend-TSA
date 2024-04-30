import mongoose from 'mongoose'

// step 1 // Create user Schema - we can use the schema from mongoose
// we destructure schema object from mongoose
const { Schema } = mongoose; 
// step 2 // we must use 'new' when creating schema object
// inside the new Schema, we create a new Schema object for user data
const userSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            true: true,
        },
        email:{
            type: String,
            required: true,
            true: true,
            unique: true, // to avoid collisions with other properties of the same name in different email addresses
        },
        password:{
            type: String,
            required: true,
            minlength: 6,
            maxlength: 64,
        },
        image:{
            type: String
        },
        imagePublicId:{
            type: String
        },
        role:{
            type: Number,
            default: 0,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        address: {
            type: Object,
            default: {
                street: "1 Ogunlesi street",
                city: "Onipanu",
                state: "Lagos",
                zip: 123456
            },
        },
        OTP: {
            type: String,
        }
    },
    {
        timestamps: true,
    }// it's coming from mongoose. Telling us the time it was created
);

// step 3 // export the data to the database
export default mongoose.model('User', userSchema)
// go to controller