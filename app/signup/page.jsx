"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const SignUp = () => {
    const router = useRouter()
  const [data, setdata] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
    course: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signup", data);
      console.log(response);
      setdata({
        userName: "",
        email: "",
        password: "",
        phone: "",
        course: "",
      })
      toast.success("Created User Succesfylly", { position: "top-center" });
        router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Sign Up</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className=" font-satoshi font-semibold text-base text-gray-700">
            Full Name
          </span>
          <input
            value={data.userName}
            onChange={(e) => setdata({ ...data, userName: e.target.value })}
            placeholder="Enter Your Full Name"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className=" font-satoshi font-semibold text-base text-gray-700">
            Email
          </span>
          <input
            type="text"
            value={data.email}
            onChange={(e) => setdata({ ...data, email: e.target.value })}
            placeholder="Enter Your Email"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className=" font-satoshi font-semibold text-base text-gray-700">
            Password
          </span>
          <input
            type="text"
            value={data.password}
            onChange={(e) => setdata({ ...data, password: e.target.value })}
            placeholder="Enter Your Password"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className=" font-satoshi font-semibold text-base text-gray-700">
            Phone Number
          </span>
          <input
            type="number"
            value={data.phone}
            onChange={(e) => setdata({ ...data, phone: e.target.value })}
            placeholder="Enter Your Password"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className=" font-satoshi font-semibold text-base text-gray-700">
            Course
          </span>
          <input
            type="text"
            value={data.course}
            onChange={(e) => setdata({ ...data, course: e.target.value })}
            placeholder="Enter Your Password"
            required
            className="form_input"
          />
        </label>
        <div className=" mx-3 mb-5 gap-4">
          <button
            type="submit"
            className="px-5 py-1.5 w-full text-lg font-semibold bg-primary-orange rounded-full text-white"
          >
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
