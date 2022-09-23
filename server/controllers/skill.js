import Skill from "../models/skill";
import slugify from "slugify";

export const create = async (req, res) => {
    try {
        const { name, parent } = req.body;
        res.json(await new Skill({ name, parent, slug: slugify(name) }).save());
    } catch (err) {
        console.log(err);
        res.status(400).send("Create Skill failed");
    }
};

export const list = async (req, res) =>
    res.json(await Skill.find({}).sort({ createdAt: -1 }).exec());

export const read = async (req, res) => {
    let skill = await Skill.findOne({ slug: req.params.slug }).exec();
    res.json(skill);
};

export const update = async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await Skill.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).send("Skill update failed");
    }
};

export const remove = async (req, res) => {
    try {
        const deleted = await Skill.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Skill delete failed");
    }
};