import Parser from 'rss-parser';

import { RUTOR_URL, RUTOR_RSS, RUTOR_CATEGORIES, CHECK_RUTOR_CATEGORIES } from './constants';
import { CustomFeed, CustomItem, Torrrents, Updates } from './types.dto';
import { catcher } from './catcher';

const updatesCache: { [key: string]: Torrrents } = {};

const rutorUpdate = async (rutorCategory = RUTOR_CATEGORIES.series): Promise<Torrrents> => {
  const parser: Parser<CustomFeed, CustomItem> = new Parser({
    customFields: {
      feed: ['title', 'link'],
      item: ['title', 'pubDate', 'link'],
    },
  });

  const trnts: Torrrents = {};
  const catCache = updatesCache[rutorCategory] || {};
  const url = RUTOR_URL + RUTOR_RSS + rutorCategory;
  const feed = await parser.parseURL(url);
  feed.items.forEach(item => {
    const linkArr = item?.link?.split('/');
    const rutorId = linkArr[4];
    if (catCache) {
      if (catCache[rutorId]) return;
    }

    if (!trnts[rutorId]) {
      trnts[rutorId] = {
        title: item?.title,
        link: item?.link,
        pubDate: item?.pubDate,
      };
    }
  });

  const cacheKeys = Object.keys(trnts);
  if (cacheKeys?.length) {
    for (const key in trnts) {
      catCache[key] = trnts[key];
    }
    const newCacheKeys = Object.keys(catCache);
    if (newCacheKeys?.length > 100) {
      const newKeys = newCacheKeys.slice(0, 100);
      const newCatCache: Torrrents = {};
      for (const newKey in newKeys) {
        newCatCache[newKey] = trnts[newKey] || catCache[newKey];
        updatesCache[rutorCategory] = newCatCache;
      }
    } else updatesCache[rutorCategory] = catCache;
  }
  // console.log(trnts)
  return trnts;
};

export const getRutorUpdates = async (): Promise<Updates> => {
  const updates: Updates = { movies: {}, series: {} };
  const rutorPromises = CHECK_RUTOR_CATEGORIES.map((cat) =>
      new Promise((res, rej) => {
        rutorUpdate(cat.category).then((data) => {
          // console.log(cat.category, data)
          if (Object.keys(data)?.length) {
            console.log(Object.keys(data)?.length)
            console.log('updates key', cat.key, Object.keys(data)?.length, updates[cat.key])
            if (updates[cat.key]) {
              updates[cat.key] = { ...updates[cat.key], ...data };
            } else {
              updates[cat.key] = data;
              console.log('updates[cat.key]', updates[cat.key])
            }
          }
          res(null);
        }).catch(err => catcher(err));
      })
  );
  const all = Promise.all(rutorPromises);
  await all;
  console.log('all', all)
  console.log('updates', updates)
  return updates;
};
