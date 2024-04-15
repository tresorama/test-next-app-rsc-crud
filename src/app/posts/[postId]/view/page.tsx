import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle/db.client";
import { posts as tablePosts } from "@/db/drizzle/schema";
import Link from "next/link";

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
    <div className="space-y-8">
      <h1 className="text-3xl font-medium">{post.title}</h1>
      <table className="table-auto border-collapse [&_tr>*]:border [&_tr>*]:border-red-400 [&_tr>*]:py-0.5 [&_tr>*]:px-2 [&_th]:text-left">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{post.id}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{post.status}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{post.title}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <Link href={`/posts/${post.id}/edit`} className="underline">Edit</Link>
      </div>
      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}