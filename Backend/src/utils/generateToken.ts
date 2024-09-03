import jwt from 'jsonwebtoken'
import { Response } from 'express'

const generateToken = (userId: string, res: Response) => {
    const token = jwt.sign({ userId }, process.env.jwt_secret!, {
        expiresIn: "15d",
    })

    res.cookie("jwt", token, {                   //jwt is just name we can give token also
        maxAge: 15 * 24 * 60 * 60 * 1000,              // in milliseconds
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== "development"
    })

    return token
}

export default generateToken