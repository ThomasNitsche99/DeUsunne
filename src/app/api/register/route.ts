import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, password, image } = await req.json();

    const hashed = await hash(password, 12);

    const user = await db.user.create({
      data: {
        username: name,
        password: hashed,
        image: image,
      },
    });

    return NextResponse.json({
      user: {
        username: user.username,
      },
    });
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
      }
    );
  }
}
