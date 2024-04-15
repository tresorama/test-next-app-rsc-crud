'use client';

import { useFormStatus } from "react-dom";
import { Button } from "@/app/_components/ui/button";

export const PostDeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="disabled:animate-pulse"
    >
      {pending ? 'Deleting...' : 'Delete'}
    </Button>
  );
};