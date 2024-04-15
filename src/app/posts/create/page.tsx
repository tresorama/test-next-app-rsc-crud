import { CreatePostForm } from "../_components/post-form";

export default function Page() {
  return (
    <section className="space-y-8">
      <h1>Create New Post</h1>
      <CreatePostForm />
    </section>
  );
}