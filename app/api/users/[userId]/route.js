import { connetToDB } from "@database/db";
import User from "@models/user";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'



export async function PUT(request, { params }) {
    await connetToDB()
    try {
        const { userId } = params;
        const { userName, phone, course } = await request.json()
        const getUser = await User.findById(userId);
        if (!getUser) {
            return NextResponse.json({ message: "User Does Not Exist" }, { status: 404 })
        }
        getUser.userName = userName
        getUser.phone = phone
        getUser.course = course

        const updatedUser = await getUser.save()
        return NextResponse.json(updatedUser, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}

export async function GET(request, { params }) {
    await connetToDB()
    try {
        const { userId } = params;
        const getAuthToken = request.headers.get('Authorization')
        const decode = jwt.verify(getAuthToken, process.env.JWT_SECRET)
        if (!getAuthToken && !decode) {
            return new Response(JSON.stringify("Invalid Token"), { status: 404 })
        }

        const user = await User.findById(userId)
        if (!User) {
            return NextResponse.json({ message: "User Does Not Exits" }, { status: 404 })
        }
        return NextResponse.json(user, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const { userId } = params;
        await User.deleteOne(userId)
        return NextResponse.json({ message: "User is Deleted" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}