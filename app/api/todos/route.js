import Todo from "@models/todo";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        const todos = await Todo.find()
        if(!todos){
            return NextResponse.json({message:"NO Todo Found"},{status:404})

        }
        return NextResponse.json(todos,{status:200})
    } catch (error) {
        return NextResponse.json({message:error},{status:500})
    }
}

export async function POST(request,{params}){
    try {
        const {userId} = params;
        const {title,description,tag} = request.json()

        const newTodo = new Todo({
            title,
            description,
            tag,
            userId,
        })
        const createTodo = await newTodo.save()
        return NextResponse.json(createTodo,{status:200})

    } catch (error) {
        return NextResponse.json({message:error},{status:500})
    }
}
