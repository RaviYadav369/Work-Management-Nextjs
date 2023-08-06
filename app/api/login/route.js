import User from "@models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { connetToDB } from "@database/db";

export async function POST(request) {
    await connetToDB()

    try {
        const { email, password } = await request.json()
        console.log(email, password);
        const getUser = await User.findOne({ email: email })
        if (!getUser) {
            return NextResponse.json({ message: "No User Exits With This email" }, { status: 404 })
        }
        const isMatch = await bcrypt.compare(password, getUser.password)
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid Credetials" }, { status: 404 })
        }
        const token = jwt.sign({ id: getUser._id,userName:getUser.userName,phone:getUser.phone,course:getUser.course }, process.env.JWT_SECRET)
        if (getUser && isMatch) {
            return new Response(JSON.stringify({getUser,token}),{status:200})
        }

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}