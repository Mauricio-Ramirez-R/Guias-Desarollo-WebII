import { Request, Response } from "express";
import User from "../models/Users";
import { hashPassword } from "../utils/auth";
import { validationResult } from "express-validator";
import { validatePassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {

    let errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, password, email, username } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(409).json({ message: "User already exists for this email" });
        return;
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
        res.status(409).json({ message: "Username already exists" });
        return;
    }

    const user = new User(req.body);
    user.password = await hashPassword(password);
    await user.save();
    res.status(201).json({ message: "User created successfully" });
}

export const login = async (req: Request, res: Response) => {

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error("Invalid Credentials")
        return res.status(401).json({ error: error.message })
    }

    const isPasswordCorrect = await validatePassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error("Invalid Credentials")
        return res.status(401).json({ error: error.message })
    }

    res.status(200).json({ message: "Authenticated" })
}