import { connetToDB } from "@database/db";
import User from "@models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'


export async function POST(request) {
    await connetToDB()

    try {
        const { userName, email, password, phone, course } = await request.json()
        const user = await User.findOne({ email: email })
        if (user) {
            return NextResponse.json({ message: "User Already Exist With this Email" })
        }
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = new User({
            userName,
            email,
            password: passwordHash,
            phone,
            course
        })
        const createUser = await newUser.save()

        return NextResponse.json(createUser, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}