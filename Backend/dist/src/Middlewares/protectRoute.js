import jwt from 'jsonwebtoken';
import prisma from '../db/db.js';
const protecRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({ msg: "unauthorised -no token provided" });
        }
        const decode = jwt.verify(token, process.env.jwt_secret);
        if (!decode) {
            return res.status(400).json({ msg: "please login" });
        }
        const user = await prisma.user.findUnique({ where: { id: decode.userId }, select: { id: true, username: true, fullName: true, profilePic: true } });
        if (!user) {
            return res.status(400).json({ msg: "user not found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error in finding me", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export default protecRoute;
