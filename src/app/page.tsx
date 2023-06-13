import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@/types";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

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
    <div className="h-screen w-screen flex justify-center items-center sm:p-6">
      <div className="p-4 w-full h-full bg-white text-black sm:w-[550px] sm:rounded-2xl">
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
