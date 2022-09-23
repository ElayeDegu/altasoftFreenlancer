import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 64,
        },
        picture: {
            type: String,
            default: "/avatar.png",
        },
        role: {
            type: [String],
            default: ["Admin"],
            enum: ["Developer", "Companies", "Admin"],
        },
        sex: {
            type: [String],
            default: ["Male"],
            enum: ["Male", "Female", "Not"],
        },
        stripe_account_id: "",
        stripe_seller: {},
        stripeSession: {},
        passwordResetCode: {
            data: String,
            default: "",
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
