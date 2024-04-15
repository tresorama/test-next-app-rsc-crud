'use client';

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/app/_components/ui/button";
import { FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea } from "@/app/_components/ui/form-elements";
import { type Post_Select } from "@/db/drizzle/schema";
import { createPost, updatePost } from "./post-form.actions";

export const CreatePostForm = () => (
  <PostForm />
);
export const EditPostForm = ({ post }: { post: Post_Select; }) => (
  <PostForm
    post={post}
  />
);


// This form is used to create and update post
type FormType = 'create' | 'update';
const PostForm = ({ post }: { post?: Post_Select; }) => {
  const formType: FormType = post ? 'update' : 'create';
  const formInitialValues = formType === 'update' ? { ...post } : {
    title: '',
    status: 'draft',
    content: '',
  };
  const action = formType === 'update' ? updatePost : createPost;
  const [formActionState, formAction] = useFormState(action, {});


  return (
    <>
      <form
        action={formAction}
        className="space-y-8"
      >
        {formType === 'update' && post && (
          <input type="hidden" name="id" value={post.id} />
        )}
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input name="title" id="title" defaultValue={formInitialValues.title} />
          {formActionState.errors?.title && <FormErrorMessage messages={formActionState.errors.title} />}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="status">Status</FormLabel>
          <Select name="status" id="status" defaultValue={formInitialValues.status}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </Select>
          {formActionState.errors?.status && <FormErrorMessage messages={formActionState.errors.status} />}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="content">Content</FormLabel>
          <Textarea
            name="content"
            id="content"
            defaultValue={formInitialValues.content}
            rows={5}
          />
          {formActionState.errors?.content && <FormErrorMessage messages={formActionState.errors.content} />}
        </FormControl>
        <div className="flex gap-4 [&>*]:flex-grow">
          <SubmitButton formType={formType} />
          <Button type="reset">Reset</Button>
        </div>
      </form>

      <DebugJson json={formActionState} />

    </>
  );
};

function SubmitButton({ formType }: { formType: FormType; }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="disabled:animate-pulse"
    >
      {formType === 'create' && pending && 'Creating...'}
      {formType === 'create' && !pending && 'Create'}
      {formType === 'update' && pending && 'Updating...'}
      {formType === 'update' && !pending && 'Update'}
    </Button>
  );
}

const DebugJson = ({ json }: { json: unknown; }) => (
  <pre
    style={{
      whiteSpace: 'pre',
      maxWidth: '100%',
      overflow: 'auto'
    }}
  >
    {JSON.stringify(json, null, 4)}
  </pre>
);