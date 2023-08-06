"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", data);
      console.log(response);
      setdata({
        email: "",
        password: "",
      });
      toast.success("Logged In User Succesfylly");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Login</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
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

        <div className=" mx-3 mb-5 gap-4">
          <button
            type="submit"
            className="px-5 py-1.5 w-full text-lg font-semibold bg-primary-orange rounded-full text-white"
          >
            Sign In
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
