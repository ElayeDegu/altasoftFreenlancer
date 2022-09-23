import Technologies from "../models/Technologies";
import slugify from "slugify";

export const create = async (req, res) => {
    try {
        const { name } = req.body;
        res.json(await new Technologies({ name, slug: slugify(name) }).save());
    } catch (err) {
        res.status(400).send("Create Technologies failed");
    }
};

export const list = async (req, res) =>
    res.json(await Technologies.find({}).sort({ createdAt: -1 }).exec());

export const read = async (req, res) => {
    let technologies = await Technologies.findOne({ slug: req.params.slug }).exec();
    res.json(technologies);
};

export const update = async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await Technologies.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).send("Technologies update failed");
    }
};

export const remove = async (req, res) => {
    try {
        const deleted = await Technologies.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Technologies delete failed");
    }
};
