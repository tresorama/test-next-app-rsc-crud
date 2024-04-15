'use server';

import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle/db.client";
import { posts } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const FAKE_DELAY = 1000;
const sleep = (timeInMs: number) => new Promise(res => setTimeout(res, timeInMs));


type FormActionState = {
  status: "idle";
} | {
  status: "success";
  generalSuccessMessage: string;
} | {
  status: "error",
  generalErrorMessage: string;
};

export const deletePost = async (
  prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> => {
  // simulate slow request
  await sleep(FAKE_DELAY);

  // parse data from form
  const id = formData.get("id") as string;

  // delete post
  try {
    await db.delete(posts).where(eq(posts.id, Number(id)));
  } catch (error) {
    return {
      status: 'error',
      generalErrorMessage: "Something went wrong! Please try again.",
    };
  }

  // revalidate posts page
  revalidatePath("/posts");
  redirect("/posts");
  // return {
  //   status: 'success',
  //   generalSuccessMessage: "Post deleted successfully!",
  // };

};