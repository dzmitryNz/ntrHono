import { Hono } from 'hono';
import Parser from 'rss-parser';
import { Torrrents } from './types.dto';

const app = new Hono();

app.get('/', async c => {
  type CustomFeed = { title: string; link: string };
  type CustomItem = { title: string; pubDate: string; link: string };

  const parser: Parser<CustomFeed, CustomItem> = new Parser({
    customFields: {
      feed: ['title', 'link'],
      item: ['title', 'pubDate', 'link'],
    },
  });
  const trnts: Torrrents = {};
  const feed = await parser.parseURL('https://alt.rutor.info/rss.php?category=1');
  feed.items.forEach(item => {
    const linkArr = item?.link?.split('/');
    const rutorId = linkArr[4];
    console.log(rutorId);
    if (!trnts[rutorId]) {
      trnts[rutorId] = {
        title: item?.title,
        link: item?.link,
      };
    }
  });
  console.log(trnts);
  return c.json(trnts);
});

export default app;
