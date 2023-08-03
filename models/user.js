import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
        userName: {
            type: String,
            require: [true, "User Name is Required"],
            min: 3,
        },
        email: {
            type: String,
            require: [true, "Email is Required"],
            unique: [true, "Email should be unique"],
        },
        password: {
            type: String,
            require: [true, "Password is Required"],
        },
        phone: {
            type: Number,
            require: [true, "Phone is Required"]
        },
        course: {
            type: String,
            required: [true, "Course is Required"],
        }

    }
)

const User = mongoose.models.User || mongoose.model("Users", userSchema)

export default User