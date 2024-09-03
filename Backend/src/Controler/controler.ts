import generateToken from '../utils/generateToken.js'
import prisma from '../db/db.js'
import { Response, Request } from "express"
import bcryptjs from "bcryptjs"


export const signup = async (req: Request, res: Response) => {
    try {
        const { username, fullName, passWord, confirmPassword, gender } = req.body

        if (!username || !fullName || !passWord || !confirmPassword || !gender) {
            return res.status(400).json({ error: "please fill in all fields" });
        }

        if (passWord !== confirmPassword) {
            return res.status(400).json({ error: "passWord does not match" })
        }

        const user = await prisma.user.findUnique({ where: { username } })

        if (user) {
            return res.status(400).json({ message: "user already exists" })
        }
        const salt = await bcryptjs.genSalt(10)
        const hassedPassword = await bcryptjs.hash(passWord, salt)

        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = await prisma.user.create({
            data: {
                username,
                fullName,
                passWord: hassedPassword,
                gender,
                profilePic: gender === "male" ? boyProfilePicture : girlProfilePicture
            }
        })

        if (newUser) {
            generateToken(newUser.id, res)

            res.status(201).json({
                id: newUser.id,
                username: newUser.username,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            })
        }

    } catch (error: any) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });

    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { username, passWord } = req.body
        const user = await prisma.user.findUnique({ where: { username } })
   
        if(username === "" || passWord === "") {
           
            return res.status(400).json({error : "please fill login details"})
        }

        if (!user) {
           return  res.status(400).json({ error: "username not found" })
        }

        const isPasswordcorrect = await bcryptjs.compare(passWord, user.passWord);
        if (!isPasswordcorrect) {
           return  res.status(400).json({ error: "password Incorrect" })
        }

        generateToken(user.id, res)

        res.status(200).json({
            id : user.id,
            username : user.username,
            gender : user.gender,
            profilePic : user.profilePic

        })
    } catch (error: any) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export const logout = async (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", {maxAge : 0})
        res.status(200).json({msg : "logout succesfully"})
    } catch (error : any) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
 }

 export const getme  = async (req : Request,res: Response) => {
    try {
        const user = await prisma.user.findUnique({where : {id : req.user.id}})

        if(!user){
           return res.status(400).json({error : "user not found"})
        }
        
        res.status(200).json({
            id : user.id,
            username : user.username,
            fullName : user.fullName,
            profilePic : user.profilePic
        })
    } catch (error : any) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ error: "Internal Server Error in getMe" });
    }
 }