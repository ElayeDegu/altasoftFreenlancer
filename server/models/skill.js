import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const skillSchema = new mongoose.Schema(
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
        parent: {
            type: ObjectId,
            ref: "Role",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);