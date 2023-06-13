import { db } from "./db";


export async function getPosts(id: string) {
  const posts = await db.gamblingSession.findMany({
    select: {
        createdAt: true,
        deposit: true,
        message: true,
        withdraw: true,
        id: true,
        user: {
            select: {
                username: true,
                image: true,
                id: true
            }
        }
    },
    where: {
        feedable: true,
        AND: {
            user: {
                following: {
                    every:{
                        followingId: id,
                    }
                }
            }
        }
    },
    orderBy :{
        createdAt: "desc"
    },
    take: 10
  });
  return posts;
}

export async function userrs() {

    const users = await db.user.findMany();
    return users;
  }