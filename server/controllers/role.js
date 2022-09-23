import Role from "../models/role";
import Skill from "../models/skill";
import slugify from "slugify";

export const create = async (req, res) => {
    try {
        const { name } = req.body;
        res.json(await new Role({ name, slug: slugify(name) }).save());
    } catch (err) {
        res.status(400).send("Create Role failed");
    }
};

export const list = async (req, res) =>
    res.json(await Role.find({}).sort({ createdAt: -1 }).exec());

export const read = async (req, res) => {
    let role = await Role.findOne({ slug: req.params.slug }).exec();
    res.json(role);
};

export const update = async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await Role.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).send("Role update failed");
    }
};

export const remove = async (req, res) => {
    try {
        const deleted = await Role.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Role delete failed");
    }
};

export const getSkills = async (req, res) => {
    Skill.find({ parent: req.params._id }).exec((err, skills) => {
        if (err) console.log(err);
        console.log("Skill found", skills);
        res.json(skills);
    });

};