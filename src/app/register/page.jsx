"use client";

import Link from "next/link";

import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form, Select, SelectTrigger, SelectValue, SelectIndicator, SelectPopover, ListBox, ListBoxItem } from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import logo from '../../assets/arthub-logo.jpg'
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";
import { redirect } from "next/navigation";
import { uploadImage } from "@/utils/uploadImage";


export default function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();




    const onSubmit = async (data) => {
       
         // Upload image to imgbb
      const imageFile = data.image[0];
      const imageUrl=await uploadImage(imageFile)
      console.log(imageUrl);

    const { data: signUpData, error: signUpError } = await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
            image: imageUrl,
            role: data.role
        })

        console.log(signUpData, signUpError);

        if (signUpError) {
            toast.error("Registration not succeed...")
        }
        else{
            redirect("/")
        }


    }
    console.log(errors);

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
          Discover &
          <br />
          Buy Original
          <br />
          Artworks
        </h1>

        <p className="text-lg text-orange-100 max-w-md">
          Join ArtHub to explore unique artwork, support talented artists,
          and showcase your own creative masterpieces to the world.
        </p>

        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎨</span>
            <span>Browse exclusive artworks</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🖌️</span>
            <span>Sell your own creations</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🌎</span>
            <span>Connect with artists worldwide</span>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
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
              Create Account
            </h1>

            <p className="text-gray-500 text-sm">
              Join ArtHub to discover, collect, and showcase extraordinary
              artwork.
            </p>
          </CardHeader>

          <CardBody className="gap-4">

            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div className="w-full">
                <Label
                  htmlFor="name"
                  className="text-gray-700 font-medium mb-1"
                >
                  Full Name
                </Label>

                <Input
                  {...register("name", {
                    required: "Name is Required",
                  })}
                  id="name"
                  placeholder="John Doe"
                  className="w-full"
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <Label
                  htmlFor="email"
                  className="text-gray-700 font-medium mb-1"
                >
                  Email Address
                </Label>

                <Input
                  {...register("email", {
                    required: "Email is Required",
                  })}
                  id="email"
                  type="email"
                  placeholder="john@example.com"
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
                  htmlFor="image"
                  className="text-gray-700 font-medium mb-1"
                >
                  Profile Image
                </Label>

                <Input
                  {...register("image", {
                    required: "image is Required",
                  })}
                  type="file"
                  accept="image/*"
                  id="image"
                  className="w-full"
                />

                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image.message}
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
                    required: "Password is required",
                  })}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full"
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label
                  htmlFor="role"
                  className="text-gray-700 font-medium"
                >
                  Select Role
                </Label>

                <select
                  id="role"
                  {...register("role", {
                    required: "Role is required",
                  })}
                  className="w-full p-3 rounded-xl border border-orange-200 bg-white outline-none focus:border-orange-500"
                >
                  <option value="buyer">
                    Buyer
                  </option>

                  <option value="artist">
                    Artist
                  </option>
                </select>

                {errors.role && (
                  <p className="text-red-500 text-sm">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold h-12 rounded-xl hover:scale-[1.02] transition-all"
              >
                Create Account
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
              Google OAuth
            </Button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-orange-500 hover:text-orange-600 font-semibold hover:underline"
              >
                Log In
              </Link>
            </p>

          </CardBody>
        </Card>

      </div>
    </div>
  </div>
    );
}