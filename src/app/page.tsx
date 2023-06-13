import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import mypic from "../assets/gates.png";
import { User } from "@/types";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import RegisterSessionForm from "@/components/SessionForm";

async function getSession() {
  "use server";
  const session = (await getServerSession(authOptions)) as unknown as User;
  if(session){
    redirect("/home");
  }
}

//Home page, Showing just user card
export default async function RegisterPage() {
  const session = await getSession();
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="sm:shadow-xl p-4 rounded-xl bg-white sm:bg-white text-black">
        <h1 className="font-semibold text-2xl py-12">Create your account</h1>
        <RegisterForm />
        <p className="text-center my-4">
          Have an Account?{" "}
          <Link href="/api/auth/signin?callbackUrl=%2Fhome" className="hover:undeline">
            Sign in{" "}
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
