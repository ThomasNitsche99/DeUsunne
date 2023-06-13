import { prisma } from "./db";


export async function getPosts(id: string) {
  const posts = await prisma.gamblingSession.findMany({
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
                    some: {
                        followingId: id
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
