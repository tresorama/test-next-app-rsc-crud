'use client';

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Toaster, toast } from "sonner";
import { deletePost } from "./post-delete-form.actions";

export const PostDeleteForm = ({ postId, children }: { postId: number; children: React.ReactNode; }) => {
  const [formActionState, formAction] = useFormState(deletePost, { status: 'idle' });

  useEffect(() => {
    if (formActionState.status === 'success') {
      toast.success(formActionState.generalSuccessMessage);
    } else if (formActionState.status === 'error') {
      toast.error(formActionState.generalErrorMessage);
    }
  }, [formActionState]);

  return (
    <>
      <Toaster />
      <form action={formAction}>
        <input type="hidden" name="id" value={postId} />
        {children}
      </form>
    </>
  );
};