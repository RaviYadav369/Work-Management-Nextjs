import { connetToDB } from "@database/db";
import Todo from "@models/todo";
import { NextResponse } from "next/server";


connetToDB()

export async function PUT(request, { params }) {
    try {
        const { todoId } = params;
        const { title, description, tag } = request.json();

        const todo = Todo.findById(todoId)
        todo.title = title;
        todo.description = description;
        todo.tag = tag;
        const updatedTodo = await todo.save()
        return NextResponse.json(updatedTodo, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const { todoId } = params;
        await Todo.deleteOne(todoId)
        return NextResponse.json({ message: "Todo is Deleted" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}