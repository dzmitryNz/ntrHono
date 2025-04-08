import Parser from 'rss-parser';

import { RUTOR_URL, RUTOR_RSS } from './constants';
import { CustomFeed, CustomItem, Torrrents } from './types.dto';

const updatesCache: { [key: string]: Torrrents } = {};

export const getRutorUpdates = async (rutorCategory = '1'): Promise<Torrrents> => {
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
  return trnts;
};
