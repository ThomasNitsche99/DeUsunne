import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FeedPost from "@/components/feedPost";
import { getPosts } from "@/lib/crud";
import { User } from "@/types";
import { getServerSession } from "next-auth";

async function getSession() {
  "use server";
  const session = (await getServerSession(authOptions)) as unknown as User;
  return session;
}

export default async function FeedPage() {
  const session = await getSession();
  const posts = await getPosts(session.user.id);

  return (
    <>
      <div className="flex justify-evenly items-center container flex-col ">
        {posts.map((post) => {
          return (
            <FeedPost
              key={post.id}
              username={post.user.username}
              message={post.message!}
              deposit={post.deposit}
              withdraw={post.withdraw}
              image={post.user.image!}
              date={post.createdAt}
            />
          );
        })}
      </div>
    </>
  );
}
