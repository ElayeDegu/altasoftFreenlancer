import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const educationSchema = new mongoose.Schema(
    {
        educationName: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 320,
            required: true,
        },
        slug: {
            type: String,
            lowercase: true,
            sparse: true,
            unique: true,
            text: true,
        },
        fieldOfStudy: String,
        degree: String,

    },
    { timestamps: true }
);

const experienceSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 320,
            required: true,
        },
        slug: {
            type: String,
            lowercase: true,
            sparse: true,
            unique: true,
            text: true,
        },
        durations: String,
        responsibility: String,
    },
    { timestamps: true }
);

// const responsibilitySchema = new mongoose.Schema(
//     {
//         title: {
//             type: String,
//             trim: true,
//             minlength: 3,
//             maxlength: 320,
//             required: true,
//         },
//         slug: {
//             type: String,
//             lowercase: true,
//         },
//     },
//     { timestamps: true }
// );

const projectSchema = new mongoose.Schema(
    {
        projectName: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 320,
            required: true,
        },
        slug: {
            type: String,
            lowercase: true,
            sparse: true,
            unique: true,
            text: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        completionDate: {
            type: Date,
            required: true,
        },
        durations: {
            type: Number,
            default: 5,
        },
        content: String,
        technologies: {
            type: ObjectId,
            ref: "Technologies",
        },
        images: {
            type: Array,
        },
        published: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const profileSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            maxlength: 320,
            required: true,
        },
        slug: {
            type: String,
            lowercase: true,
        },
        link: String,
        hour: {
            type: Number,
            default: 0,
        },
        rate: {
            type: Number,
            default: 0,
        },
        // images: {
        //     type: Array,
        // },
        gender: {
            type: String,
            enum: ["Male", "Female", "Not Interested"],
        },
        currency: {
            type: String,
            enum: ["USD", "EUR", "GBP"],
        },
        // published: {
        //     type: Boolean,
        //     default: false,
        // },
        developer: {
            type: ObjectId,
            ref: "User",
        },
        role: {
            type: ObjectId,
            ref: "Role",
        },
        skills: [
            {
                type: ObjectId,
                ref: "Skill",
            },
        ],
        // ratings: [
        //   {
        //     star: Number,
        //     postedBy: { type: ObjectId, ref: "User" },
        //   },
        // ],
        // skills: {
        //     type: ObjectId,
        //     ref: "Skill",
        //     required: true,
        // },
        // roles: [roleSchema],
        // skills: [skillSchema],
        projects: [projectSchema],
        education: [educationSchema],
        experience: [experienceSchema],
    },
    { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
