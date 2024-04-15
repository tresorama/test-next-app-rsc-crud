import { db } from "@/db/drizzle/db.client";
import { Gallery_Select } from "@/db/drizzle/schema";
import Link from "next/link";

export default async function Page() {
  const galleries = await db.query.galleries.findMany({});

  return (
    <div className="space-y-8">
      <PageHeader />
      <GalleryList galleries={galleries} />
    </div>
  );
}

const PageHeader = () => (
  <section>
    <h1 className="font-medium">All Galleries</h1>
  </section>
);

const GalleryList = ({ galleries }: { galleries: Gallery_Select[]; }) => (
  <section className='w-full grid gap-2 grid-cols-2 lg:grid-cols-4'>
    {galleries.map(gallery => (
      <article key={gallery.id} className='relative'>
        <div className="w-full aspect-square bg-neutral-800">
          {gallery.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={gallery.image_url}
              alt={gallery.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <header className='absolute bottom-0 left-0 right-0 bg-neutral-900/50 p-2'>
          <p>{gallery.title}</p>
        </header>
        <Link
          href={`/gallery/${gallery.id}`}
          className="absolute inset-0"
        />
      </article>
    ))}
  </section>
);
