import mongoose, { Schema, model, models } from "mongoose";
import User from "./user";

const todoSchema = new Schema(
    {
        title: {
            type: String,
            require: [true, "Title Name is Required"],
        },
        description: {
            type: String,
            require: [true, "Description is Required"],
        },
        tag: {
            type: String,
            require: [true, "Tag is Required"]
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            require: [true, "User ID is Required"],
        }
    },
    {
        timestamps: true,
    }
)

const Todo = mongoose.models.Todo || mongoose.model("Todos", todoSchema)

export default Todo