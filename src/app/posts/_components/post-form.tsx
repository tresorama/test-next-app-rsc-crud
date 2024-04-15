'use client';

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import { type Post_Select } from "@/db/drizzle/schema";
import { createPost, updatePost } from "./post-form.actions";
import { FormControl, FormErrorMessage, FormGeneralErrorMessage, FormGeneralSuccessMessage, FormLabel, Input, Select, Textarea } from "@/app/_components/ui/form-elements";
import { Button } from "@/app/_components/ui/button";

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
  const [formActionState, formAction] = useFormState(action, { status: 'idle' });

  useEffect(() => {
    if (formActionState.status === 'success') {
      toast.success(formActionState.generalSuccessMessage);
    }
    if (formActionState.status === 'error') {
      toast.error(formActionState.generalErrorMessage);
    }
  }, [formActionState]);


  return (
    <>
      <Toaster />
      <form
        action={formAction}
        className="space-y-8"
      >
        {/* Hidden Fields */}
        {formType === 'update' && post && (
          <input type="hidden" name="id" value={post.id} />
        )}
        {/* Form Fields */}
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input name="title" id="title" defaultValue={formInitialValues.title} />
          {formActionState.status === 'error' && formActionState.formFieldsErrors?.title && (
            <FormErrorMessage messages={formActionState.formFieldsErrors.title} />
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="status">Status</FormLabel>
          <Select name="status" id="status" defaultValue={formInitialValues.status}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </Select>
          {formActionState.status === 'error' && formActionState.formFieldsErrors?.status && (
            <FormErrorMessage messages={formActionState.formFieldsErrors.status} />
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="content">Content</FormLabel>
          <Textarea
            name="content"
            id="content"
            defaultValue={formInitialValues.content}
            rows={5}
          />
          {formActionState.status === 'error' && formActionState.formFieldsErrors?.content && (
            <FormErrorMessage messages={formActionState.formFieldsErrors.content} />
          )}
        </FormControl>
        {/* Actions Button */}
        <div className="flex gap-4 [&>*]:flex-grow">
          <SubmitButton formType={formType} />
          <Button type="reset">Reset</Button>
        </div>
        {/* General Message */}
        {formActionState.status === 'error' && <FormGeneralErrorMessage message={formActionState.generalErrorMessage} />}
        {formActionState.status === 'success' && <FormGeneralSuccessMessage message={formActionState.generalSuccessMessage} />}
        {/* Debug */}
        <DebugJson json={formActionState} />
      </form>
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
      width: '100%',
      overflow: 'auto',
      fontSize: '0.8em',
    }}
  >
    {JSON.stringify(json, null, 3)}
  </pre>
);