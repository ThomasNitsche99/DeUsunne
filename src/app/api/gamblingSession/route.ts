import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/types";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as unknown as User;

    const { deposit, withdraw, feedable, message } = await req.json();
    
    const gamblingSession = await prisma.gamblingSession.create({
      data: {
        deposit: parseInt(deposit),
        withdraw: parseInt(withdraw),
        feedable: feedable,
        message: message,
        userid: session.user.id,
      },
    });

    
    revalidatePath("/home");
    
    return NextResponse.json({
      gamblingSession: {
        session: gamblingSession,
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
