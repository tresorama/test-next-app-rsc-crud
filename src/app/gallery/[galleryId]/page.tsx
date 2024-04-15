import { db } from "@/db/drizzle/db.client";
import { Gallery_Select, galleries } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    galleryId: string,
  };
};

export default async function Page(props: PageProps) {
  const { galleryId } = props.params;
  const gallery = await db.query.galleries.findFirst({ where: eq(galleries.id, Number(galleryId)) });

  if (!gallery) return notFound();

  return (
    <div>
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold md:text-5xl">{gallery.title}</h1>
        <div className="">
          <img
            src={gallery.image_url}
            alt={gallery.title}
            className="w-full aspect-video object-cover"
          />
        </div>
      </section>
    </div>
  );
}
