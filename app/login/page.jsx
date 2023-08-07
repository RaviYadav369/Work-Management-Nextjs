"use client";
import { getProviders, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();

  const [providers, setproviders] = useState(null);

  useEffect(() => {
    const setupProvider = async () => {
      const response = await getProviders();
      setproviders(response);
    };
    setupProvider();
  }, []);

  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const searchParam = useSearchParams();
  const callbackUrl = searchParam.get("callbackUrl") || "/todo";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setdata({
        email: "",
        password: "",
      });
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });
      console.log(response);
      if (!response?.error) {
        router.push(callbackUrl);
      } else {
        console.log("Invalid email or password");
      }
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
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            className=" mt-7 my-5 p-2 font-semibold bg-blue-500 rounded-xl text-white"
            onClick={() => signIn(provider.id)}
            key={provider.name}
          >
            Sign In With {provider.name}
          </button>
        ))}
    </section>
  );
};

export default LoginForm;
