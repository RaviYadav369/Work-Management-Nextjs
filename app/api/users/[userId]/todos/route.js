import { connetToDB } from "@database/db";
import Todo from "@models/todo";
import { NextResponse } from "next/server";

connetToDB()

export async function GET(request, { params }) {
    try {
        const { userId } = params;
        const userTodos = await Todo.find({
            userId: userId
        })
        if (!userTodos) {
            return NextResponse.json({ message: "No Todo Available" }, { status: 404 })
        }
        return NextResponse.json(userTodos, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}