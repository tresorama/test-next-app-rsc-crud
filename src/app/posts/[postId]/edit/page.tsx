import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle/db.client";
import { posts as tablePosts } from "@/db/drizzle/schema";
import { EditPostForm } from "../../_components/post-form";
import { PostDeleteForm } from "../../_components/post-delete-form";
import { PostDeleteButton } from "./_components/post-delete-button";

type PageProps = {
  params: {
    postId: string,
  };
};

export default async function Page(props: PageProps) {
  const { postId } = props.params;
  const posts = await db.select().from(tablePosts).where(eq(tablePosts.id, Number(postId)));

  // ensure post is found
  if (posts.length === 0) {
    return notFound();
  }

  const post = posts[0];

  return (
    <section className="space-y-8">
      <div className="flex justify-between items-center flex-wrap">
        <p>Update Post</p>
        <PostDeleteForm postId={post.id}>
          <PostDeleteButton />
        </PostDeleteForm>
      </div>
      <EditPostForm post={post} />
    </section>
  );
}