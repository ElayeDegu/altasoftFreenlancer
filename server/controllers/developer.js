import User from "../models/user";
import Profile from "../models/profile";


export const currentdeveloper = async (req, res) => {
    try {
        let user = await User.findById(req.auth._id).select("-password").exec();
        // console.log("CURRENT DEVELOPER => ", user);
        // console.log("test", req);
        if (!user.role.includes("Developer")) {
            return res.sendStatus(403);
        } else {
            res.json({ ok: true });
        }
    } catch (err) {
        console.log(err);
    }
};

export const developerProfile = async (req, res) => {
    try {
        const profiles = await Profile.find({ developer: req.auth._id })
            .sort({ createdAt: -1 })
            .exec();
        res.json(profiles);
        console.log("Profile", profiles);
    } catch (err) {
        console.log(err);
    }
};
