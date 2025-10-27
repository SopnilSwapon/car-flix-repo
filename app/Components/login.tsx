"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // TanStack Query Mutation (using fetch instead of axios)
  const mutation = useMutation({
    mutationFn: async (data: LoginFormInputs) => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
      }

      return res.json();
    },
    onSuccess: (data) => {
      console.log("Login success:", data);
      setErrorMsg(null);
      // e.g., redirect or store token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setErrorMsg(error.message || "Login failed");
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("hello");
    router.push("/user/dashboard");
    // mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 flex flex-col gap-4 bg-foreground shadow-2xl shadow-blue-200 border border-white p-6 sm:8 lg:p-10 max-w-2xl mx-auto rounded-2xl backdrop-blur-md"
      >
        <h3 className=" text-xl lg:text-3xl font-semibold">
          Login to Your Account
        </h3>
        <label className="mt-2 ">
          Email Address<span className="text-red-700">*</span>
        </label>
        <input
          type="email"
          placeholder="Enter Your Email"
          {...register("email", { required: "Email is required" })}
          className="p-3 rounded-md border border-white/30 bg-white text-black placeholder-[#A4ABB8] focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <label className="mt-2 ">
          Password<span className="text-red-700">*</span>
        </label>
        <input
          type="password"
          placeholder="Enter Your Password"
          {...register("password", {
            required: "Password is required",
            //  pattern: {
            //    value: /\S+@\S+\.\S+/,
            //    message: "Enter a valid email",
            //  },
          })}
          className="p-3 rounded-md border border-white/30 bg-white text-black placeholder-[#A4ABB8] focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="text-secondary mt-2 cursor-pointer bg-secondary hover:bg-blue-700!  font-semibold py-3 rounded-md transition"
        >
          {isSubmitting ? "Logging..." : "Login"}
        </button>

        {/* {serverMsg && (
             <p className={serverMsg.ok ? "text-green-200" : "text-red-200"}>
               {serverMsg.text}
             </p>
           )} */}
      </form>
    </div>
  );
}
