import { connetToDB } from "@database/db"
import { NextResponse } from "next/server"
import User from "@models/user"

connetToDB()

export async function GET(request) {
    try {
        const users =await User.find()
        if(!users){
            return NextResponse.json({message:"NO User Found"},{status:404})
        }
        return NextResponse.json(users,{status:200})
        
    } catch (error) {
        return NextResponse.json({message:error},{status:500})
    }

}

export async function POST(request) {
    const { userName, email, phone, password, course } =await request.json();
    const newUser = new User({
        userName,
        email,
        phone,
        password,
        course
    })
    try {
        const createUser = await newUser.save()
        return NextResponse.json(createUser, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Error Occured" }, { status: 500 })
    }

}
