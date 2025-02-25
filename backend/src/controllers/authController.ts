import { Request, Response } from "express";
import { User } from "../models/dbModel";
import { generateToken } from "../utils/generateToken";


export const register = async (req: Request, res: Response): Promise<any> => {
    const { type, value, role } = req.body;

    try {
        const userExists = type === "email"
            ? await User.findOne({ email: value })
            : await User.findOne({ phone: value });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = type === "email"
            ? await User.create({ email: value, role })
            : await User.create({ phone: value, role });

        console.log("User registered successfully");


        const token = generateToken(newUser.id);
        console.log("Generated Token:", token);

        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ message: "User successfully registered", newUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error registering user", error });
    }

}

export const login = async (req: Request, res: Response): Promise<any> => {
    const { type, value } = req.body;

    try {
        const user = type === "email" ? await User.findOne({ email: value }) : await User.findOne({ phone: value });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        // const isMatch = await bcrypt.compare(password, user.phone);
        // if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = generateToken(user.id);
        res.cookie("token", token, { httpOnly: true });
        res.json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
};