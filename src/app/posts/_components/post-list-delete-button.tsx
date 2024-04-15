'use client';

import { useFormStatus } from "react-dom";

export const PostListDeletePostButton = () => {
  const { pending } = useFormStatus();
  return (
    <input
      type="submit"
      disabled={pending}
      className="disabled:animate-pulse"
      value={pending ? 'Deleting...' : 'Delete'}
    />
  );
};