"use server";

import { db } from "@/db/drizzle/db.client";
import { posts } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// utils
const FAKE_DELAY = 2000;
const sleep = (timeInMs: number) => new Promise(res => setTimeout(res, timeInMs));

type FormActionState = {
  status: 'idle',
} | {
  status: 'success',
  generalSuccessMessage: string,
} | {
  status: 'error',
  generalErrorMessage: string,
  formFieldsErrors?: {
    title?: string[];
    status?: string[];
    content?: string[];
  };
};
export const createPost = async (
  prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> => {

  // simulate slow request
  await sleep(FAKE_DELAY);

  // parse data from form
  const validatedData = z.object({
    title: z.string().min(3),
    status: z.enum(["published", "draft"]),
    content: z.string().min(3),
  }).safeParse({
    title: formData.get("title"),
    status: formData.get("status"),
    content: formData.get("content"),
  });

  // validate data
  if (!validatedData.success) {
    return {
      status: 'error',
      generalErrorMessage: "Some fields are invalid! Please check the form and try again.",
      formFieldsErrors: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    // create post in database
    await db
      .insert(posts)
      .values(validatedData.data);

    // revalidate path
    revalidatePath("/posts");

    // return form state
    return { status: 'success', generalSuccessMessage: "Post created successfully!" };

  } catch (error) {
    console.error({ what: "createPost - Server Action", error });

    // return form state
    return { status: 'error', generalErrorMessage: "Server error while creating post!" };
  };
};


export const updatePost = async (
  prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> => {

  // simulate slow request
  await sleep(FAKE_DELAY);


  // parse data from form
  const id = formData.get("id") as string;

  const validatedData = z.object({
    title: z.string().min(3),
    status: z.enum(["published", "draft"]),
    content: z.string().min(3),
  }).safeParse({
    title: formData.get("title"),
    status: formData.get("status"),
    content: formData.get("content"),
  });

  // validate data
  if (!validatedData.success) {
    return {
      status: 'error',
      generalErrorMessage: "Some fields are invalid! Please check the form and try again.",
      formFieldsErrors: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    // update post in database
    await db
      .update(posts)
      .set(validatedData.data)
      .where(eq(posts.id, Number(id)));

    // revalidate path
    revalidatePath("/posts");
    revalidatePath(`/posts/${id}`);

    // return form state
    return { status: 'success', generalSuccessMessage: "Post updated successfully!" };

  } catch (error) {
    console.error({ what: "updatePost - Server Action", error });

    // return form state
    return { status: 'error', generalErrorMessage: "Server error while updating post!" };
  };
};