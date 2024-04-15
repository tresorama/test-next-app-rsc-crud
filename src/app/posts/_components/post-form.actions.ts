"use server";

import { db } from "@/db/drizzle/db.client";
import { posts } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// utils
const FAKE_DELAY = 200;
const sleep = (timeInMs: number) => new Promise(res => setTimeout(res, timeInMs));


export const createPost = async (
  prevState: {
    errors?: {
      title?: string[];
      status?: string[];
      content?: string[];
    };
  },
  formData: FormData
) => {

  await sleep(FAKE_DELAY);

  // parse data from form
  const title = formData.get("title") as string;
  const status = formData.get("status") as string;
  const content = formData.get("content") as string;
  console.log({ what: "createPost - Server Action", formValues: { title, status, content } });


  // validate data
  const validatedData = z.object({
    title: z.string().min(3),
    status: z.enum(["published", "draft"]),
    content: z.string().min(3),
  }).safeParse({
    title,
    status,
    content,
  });
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors
    };
  }

  // create post in database
  await db
    .insert(posts)
    .values(validatedData.data);

  // revalidate path
  revalidatePath("/posts");
  return {
  };
};

export const updatePost = async (
  prevState: {
    errors?: {
      title?: string[];
      status?: string[];
      content?: string[];
    };
  },
  formData: FormData
) => {

  await sleep(FAKE_DELAY);

  // parse data from form
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const status = formData.get("status") as string;
  const content = formData.get("content") as string;
  console.log({ what: "updatePost - Server Action", formValues: { id, title, status, content } });


  // validate data
  const validatedData = z.object({
    title: z.string().min(3),
    status: z.enum(["published", "draft"]),
    content: z.string().min(3),
  }).safeParse({
    title,
    status,
    content,
  });
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors
    };
  }

  // update post in database
  await db
    .update(posts)
    .set(validatedData.data)
    .where(eq(posts.id, Number(id)));

  // revalidate path
  revalidatePath("/posts");
  revalidatePath(`/posts/${id}`);

  return {};
};