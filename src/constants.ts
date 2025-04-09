export const RUTOR_URL = 'https://alt.rutor.info/';

export const RUTOR_RSS = 'rss.php?category=';
export const RUTOR_CATEGORIES = { movies: '0', series: '1', moviesRu: '2', seriesRu: '3' };

export const CHECK_RUTOR_CATEGORIES: {category: string, key: 'movies' | 'series' } [] = [
  { category: RUTOR_CATEGORIES.movies, key: 'movies' },
  { category: RUTOR_CATEGORIES.moviesRu, key: 'movies' },
  { category: RUTOR_CATEGORIES.series, key: 'series' },
  { category: RUTOR_CATEGORIES.seriesRu, key: 'series' },
];
