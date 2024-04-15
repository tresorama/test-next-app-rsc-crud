import { db } from "@/db/drizzle/db.client";
import { posts as tablePosts, Post_Select } from "@/db/drizzle/schema";
import Link from "next/link";
import { PostDeleteForm } from "./_components/post-delete-form";
import { PostListDeletePostButton } from "./_components/post-list-delete-button";

export default async function Page() {
  const posts = await db.select().from(tablePosts);
  const publishedPosts = posts.filter(post => post.status === 'published');
  const draftPosts = posts.filter(post => post.status === 'draft');

  return (
    <div className="space-y-12">
      <h1>Posts</h1>

      <section>
        <Link href="/posts/create">Create New Post</Link>
      </section>

      <section>
        <h2 className="font-bold">Published Posts</h2>
        <PostList posts={publishedPosts} />
      </section>

      <section>
        <h2 className="font-bold">Draft Posts</h2>
        <PostList posts={draftPosts} />
      </section>

    </div>
  );
}

const PostList = ({ posts }: { posts: Post_Select[]; }) => (
  <div className="flex flex-col gap-2">
    {posts.map(post => (
      <div
        key={post.id}
        className="p-1 flex justify-between gap-4 bg-neutral-800"
      >
        <span>{post.title}</span>
        <div className="space-x-4 [&_a]:underline">
          <Link href={`/posts/${post.id}/view`}>View</Link>
          <Link href={`/posts/${post.id}/edit`}>Edit</Link>
          <PostDeleteForm postId={post.id}>
            <PostListDeletePostButton />
          </PostDeleteForm>
        </div>
      </div>
    ))}
  </div>
);