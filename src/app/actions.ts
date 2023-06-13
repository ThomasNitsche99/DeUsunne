"use server";

import { hash } from "bcrypt";
import { redirect } from "next/navigation";
import { prisma } from "../lib/db";
import { revalidatePath } from "next/cache";

//a register useServer function
export async function registerUser(form: FormData) {
  "use server";
  const name = form.get("name");
  const password = form.get("password");

  if (typeof name !== "string" || typeof password !== "string") {
    throw new Error("neioneine");
  }
  else if(name.length < 3){
    throw new Error("neioneine");
  }

  const hashed = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      username: name,
      password: hashed,
    },
  });

  redirect("/");
}


export async function registerGamblingSession(form: FormData){

  console.log(form)

  const deposit = form.get("deposit");
  const withdraw = form.get("withdraw");
  const feedbale = form.get("feedable");
  const message = form.get("message");

  var DepoNumber = 0;
  var withDrawNumber = 0;
  console.log(deposit);
  console.log(DepoNumber)

  revalidatePath("/home");
  


  // const gamblingSession = await prisma.gamblingSession.create({
  //   data: {
  //     deposit: deposit,
  //     withdraw: withdraw,
  //     feedable: feedable,
  //     message: message,
  //     userid: session.user.id,
  //   },
  // });
}
