// fetch posts from jsonplaceholder and seed the database
import { db, sqlite } from './db.client';
import { posts } from './schema';


const seed = async () => {
  type JsonplaygroundPost = {
    title: string,
    body: string,
  };
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data: JsonplaygroundPost[] = await response.json();

  await db
    .insert(posts)
    .values(data
      .slice(0, 10)
      .map((post) => ({
        title: post.title,
        content: post.body,
        status: Math.random() > 0.5 ? 'published' : 'draft' as any,
      })));
};


(async () => {
  try {
    console.log('Seeding database ...!');

    await seed();
    sqlite.close();

    console.log('Success!');
    process.exit(0);
  } catch (error) {
    console.log('Error!');
    console.error(error);
    process.exit(1);
  }
})();