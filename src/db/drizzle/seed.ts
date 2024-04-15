// fetch posts from jsonplaceholder and seed the database
import { getRandomUnsplashImage } from '../../utils/get-random';
import { db, sqlite } from './db.client';
import { galleries, posts } from './schema';


const seedPosts = async () => {
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
const seedGalleries = async () => {
  type Gallery = {
    name: string,
    image_url: string,
  };
  const data: Gallery[] = [
    { image_url: getRandomUnsplashImage({ w: 400, h: 400 }), name: 'Gallery 1' },
    { image_url: getRandomUnsplashImage({ w: 400, h: 400 }), name: 'Gallery 2' },
    { image_url: getRandomUnsplashImage({ w: 400, h: 400 }), name: 'Gallery 3' },
    { image_url: getRandomUnsplashImage({ w: 400, h: 400 }), name: 'Gallery 4' },
    { image_url: getRandomUnsplashImage({ w: 400, h: 400 }), name: 'Gallery 5' },
    { image_url: getRandomUnsplashImage({ w: 400, h: 400 }), name: 'Gallery 6' },
    { image_url: getRandomUnsplashImage({ w: 400, h: 400 }), name: 'Gallery 7' },
    { image_url: getRandomUnsplashImage({ w: 400, h: 400 }), name: 'Gallery 8' },
    { image_url: getRandomUnsplashImage({ w: 400, h: 400 }), name: 'Gallery 9' },
  ];

  await db
    .insert(galleries)
    .values(data.map(item => ({
      title: item.name,
      image_url: item.image_url
    })));
};


(async () => {
  try {
    console.log('Seeding database ...!');

    await seedPosts();
    await seedGalleries();
    sqlite.close();

    console.log('Success!');
    process.exit(0);
  } catch (error) {
    console.log('Error!');
    console.error(error);
    process.exit(1);
  }
})();