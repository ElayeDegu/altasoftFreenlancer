import { expressjwt } from 'express-jwt';
import User from "../models/user";

export const requireSignin = expressjwt({
    getToken: (req, res) => req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});

export const isDeveloper = async (req, res, next) => {
    try {
        const _id = req.params.id;
        let role = await User.find({ role: "Developer" })
        const user = await User.findById(_id).exec();
        if (!user && !role) {
            return res.sendStatus(403);
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
    }
};