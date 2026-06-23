
"use client";


import Link from "next/link";

import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form } from "@heroui/react";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import logo from '../../assets/arthub-logo.jpg'
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        const { data: signInData, error: signInError } = await authClient.signIn.email({
            email: data.email,
            password: data.password,
        })

        console.log(signInData, signInError);

        if (signInError) {
            toast.error("Registration not succeed...")
        }
        else {
            toast.success("Login is Successful")
            redirect("/")
        }


    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-100">
    <div className="grid lg:grid-cols-2 min-h-screen">

      {/* Left Branding Section */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 text-white">
        <Image
          src={logo}
          alt="ArtHub Logo"
          width={250}
          height={250}
          className="mb-8 w-40 h-auto"
        />

        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Welcome Back
          <br />
          To The World
          <br />
          Of Art
        </h1>

        <p className="text-lg text-orange-100 max-w-md">
          Continue exploring unique artwork, supporting talented artists,
          and managing your ArtHub collection.
        </p>

        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎨</span>
            <span>Discover original artwork</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🖌️</span>
            <span>Support talented artists</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🖼️</span>
            <span>Manage your collection</span>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center p-6">

        <Card className="w-full max-w-xl bg-white/90 backdrop-blur-xl border border-orange-100 shadow-[0_20px_60px_rgba(249,115,22,0.15)] rounded-3xl p-6">

          <CardHeader className="flex flex-col gap-2 items-center pb-6 text-center">

            <Image
              src={logo}
              alt="logo"
              width={400}
              height={400}
              className="h-16 w-auto object-contain"
            />

            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Welcome Back
            </h1>

            <p className="text-gray-500 text-sm">
              Sign in to continue your ArtHub journey.
            </p>

          </CardHeader>

          <CardBody className="gap-4">

            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >

              <div className="w-full">
                <Label
                  htmlFor="email"
                  className="text-gray-700 font-medium mb-1"
                >
                  Email Address
                </Label>

                <Input
                  {...register("email", {
                    required: "email is Required",
                  })}
                  id="email"
                  placeholder="john@example.com"
                  type="email"
                  className="w-full"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <Label
                  htmlFor="password"
                  className="text-gray-700 font-medium mb-1"
                >
                  Password
                </Label>

                <Input
                  {...register("password", {
                    required: "Password is Required",
                  })}
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  className="w-full"
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold h-12 rounded-xl hover:scale-[1.02] transition-all"
              >
                Sign In
              </Button>

            </Form>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-orange-100" />

              <span className="mx-4 text-xs text-gray-500 font-semibold uppercase">
                Continue With
              </span>

              <div className="flex-grow border-t border-orange-100" />
            </div>

            <Button
              variant="bordered"
              className="w-full border-orange-200 hover:bg-orange-50 text-gray-700 font-semibold h-11"
              radius="lg"
              startContent={
                <FaGoogle className="text-orange-500" />
              }
            >
              Google Account
            </Button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Dont have an account?{" "}
              <Link
                href="/register"
                className="text-orange-500 hover:text-orange-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>

          </CardBody>
        </Card>

      </div>
    </div>
  </div>
    );
};

export default LoginPage;