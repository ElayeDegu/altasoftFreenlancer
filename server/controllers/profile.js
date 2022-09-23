import AWS from "aws-sdk";
import nanoid from "nanoid";
import Profile from "../models/profile"
import sllugify from "slugify";
import slugify from "slugify";
import { readFileSync } from "fs";

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

export const uploadImage = async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) return res.status(400).send("No image");

        // prepare the image
        const base64Data = new Buffer.from(
            image.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
        );

        const type = image.split(";")[0].split("/")[1];

        // image params
        const params = {
            Bucket: "altasoft-bucket",
            Key: `${nanoid()}.${type}`,
            Body: base64Data,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: `image/${type}`,
        };

        // upload to s3
        S3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                return res.sendStatus(400);
            }
            console.log(data);
            res.send(data);
        });
    } catch (err) {
        console.log(err);
    }
};

export const removeImage = async (req, res) => {
    try {
        const { image } = req.body;
        // image params
        const params = {
            Bucket: image.Bucket,
            Key: image.Key,
        };

        // send remove request to s3
        S3.deleteObject(params, (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            }
            res.send({ ok: true });
        });
    } catch (err) {
        console.log(err);
    }
};

export const profile = async (req, res) => {
    // console.log("test", req.auth._id);
    // console.log("test", req);
    try {
        // console.log(req.body);
        // const alreadyExist = await Profile.findOne({
        //     slug: slugify(req.body.title.toLowerCase())
        // });
        // if (alreadyExist) return res.status(400).send("Title is taken");

        const profile = await new Profile({
            slug: slugify(req.body.title),
            developer: req.auth._id,
            unique: true,
            ...req.body,
        }).save();

        res.json(profile);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Profile create failed. Try again.");
    }
};

export const read = async (req, res) => {
    try {
        const profile = await Profile.findOne({ slug: req.params.slug })
            .populate("developer", "_id name")
            .exec();
        res.json(profile);
    } catch (err) {
        console.log(err);
    }
};

export const list = async (req, res) => {
    try {
        const profiles = await Profile.find({})
        res.json(profiles);
    } catch (err) {
        console.log(err);
    }
};

export const addProject = async (req, res) => {
    try {
        const { slug, developerId } = req.params;
        const { projectName, startDate, completionDate, duration, content, technologies, images, video } = req.body;

        if (req.auth._id != developerId) {
            return res.status(400).send("Unauthorized");
        }

        const updated = await Profile.findOneAndUpdate(
            { slug },
            {
                $push: { projects: { projectName, startDate, completionDate, duration, content, technologies, images, video, slug: slugify(projectName) } },
            },
            { new: true }
        )
            .populate("developer", "_id name")
            .exec();
        res.json(updated);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Add project failed");
    }
};

export const addEducation = async (req, res) => {
    try {
        const { slug, developerId } = req.params;
        const { educationName, fieldOfStudy, degree } = req.body;

        if (req.auth._id != developerId) {
            return res.status(400).send("Unauthorized");
        }

        const updated = await Profile.findOneAndUpdate(
            { slug },
            {
                $push: { education: { educationName, fieldOfStudy, degree, slug: slugify(educationName) } },
            },
            { new: true }
        )
            .populate("developer", "_id name")
            .exec();
        console.log("Education data", updated);
        res.json(updated);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Add Education failed");
    }
};

export const addExperience = async (req, res) => {
    try {
        const { slug, developerId } = req.params;
        const { jobTitle, durations, responsibility } = req.body;

        if (req.auth._id != developerId) {
            return res.status(400).send("Unauthorized");
        }

        const updated = await Profile.findOneAndUpdate(
            { slug },
            {
                $push: { experience: { jobTitle, durations, responsibility, slug: slugify(jobTitle) } },
            },
            { new: true }
        )
            .populate("developer", "_id name")
            .exec();
        console.log("Experience data", updated);
        res.json(updated);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Add experience failed");
    }
};