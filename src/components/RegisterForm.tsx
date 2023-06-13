"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { signIn } from "next-auth/react";
import { Alert } from "./alert";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Inputs = {
  name: string;
  password: string;
  image: string;
};

export default function RegisterForm() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const [resError, setResError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          password: data.password,
          image: data.image,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        //redirect back to sign in
        signIn();
      } else {
        setResError((await res.json()).error);
      }
    } catch (error: any) {
      setResError(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-12 w-full sm:w-[500px]"
    >
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Controller
          name="name"
          control={control}
          rules={{
            required: { value: true, message: "Username required" },
            minLength: {
              value: 7,
              message: "Username must have minimum 7 charachters",
            },
            maxLength: {
              value: 20,
              message: "Username must have less than 21 charachters",
            },
          }}
          render={({ field }) => <Input {...field} id="name" type="text" />}
        />
        {errors.name && <Alert>{errors.name.message}</Alert>}
      </div>

      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: "password required" },
            minLength: {
              value: 7,
              message: "Password must have minimum 7 charachters",
            },
            maxLength: { value: 100, message: "Max Length" },
          }}
          render={({ field }) => <Input {...field} id="password" type="text" />}
        />

        {errors.password && <Alert>{errors.password.message}</Alert>}
      </div>
      <div>
        <div className="mb-4">
          <Label htmlFor="password">Choose profile picture:</Label>
        </div>
        <div className="flex flex-row justify-evenly">
          <label htmlFor="gates" className="cursor-pointer block">
            <input
              type="radio"
              id="gates"
              defaultChecked={true}
              className="cursor-pointer peer/gates hidden"
              value={"https://ik.imagekit.io/leovegas/royalpanda/images/games/gates-of-olympus/gates-of-olympus-icon.jpg"}
              {...register("image")}
            />
            <Avatar
              className={cn(
                "w-24 h-24 peer-checked/gates:border-indigo-600 peer-checked/gates:border-4"
              )}
            >
              <AvatarImage
                src={
                  "https://ik.imagekit.io/leovegas/royalpanda/images/games/gates-of-olympus/gates-of-olympus-icon.jpg"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </label>
          <label htmlFor="wanted" className="cursor-pointer block">
            <input
              type="radio"
              id="wanted"
              className="cursor-pointer peer/wanted hidden"
              value={"https://ik.imagekit.io/leovegas/lv/games/aeen1ex6A/DnMBH11peRmnJ.jpg"}
              {...register("image")}
            />
            <Avatar
              className={cn(
                "w-24 h-24 peer-checked/wanted:border-indigo-600 peer-checked/wanted:border-4"
              )}
            >
              <AvatarImage
                src={
                  "https://ik.imagekit.io/leovegas/lv/games/aeen1ex6A/DnMBH11peRmnJ.jpg"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </label>

          <label htmlFor="yggen" className="cursor-pointer block">
            <input
              type="radio"
              id="yggen"
              className="cursor-pointer peer/yggen hidden"
              value={"https://www.yggdrasilgaming.com/w/files/2018/01/Yggdrasil-OzwinsJackpots.png"}
              {...register("image")}
            />

            <Avatar
              className={cn(
                "w-24 h-24 peer-checked/yggen:border-indigo-600 peer-checked/yggen:border-4"
              )}
            >
              <AvatarImage
                src={
                  "https://www.yggdrasilgaming.com/w/files/2018/01/Yggdrasil-OzwinsJackpots.png"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </label>
        </div>
      </div>

      <div className="w-full">
        <Button className="w-full" size={"lg"} type="submit">
          Register
        </Button>
      </div>
    </form>
  );
}
