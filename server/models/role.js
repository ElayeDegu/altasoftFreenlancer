import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 320,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Role", roleSchema);