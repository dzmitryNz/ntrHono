import { RUTOR_CATEGORIES } from "./constants"
import { getRutorUpdates } from "./services"
import { Torrrents } from "./types.dto";

export const checkUpdates = async (): Promise<{ [key:string]: Torrrents }> => {
  const rutorMoviesUpdates = await getRutorUpdates(RUTOR_CATEGORIES.movies);
  const rutorSeriesUpdates = await getRutorUpdates(RUTOR_CATEGORIES.series);
  const rutorSeriesRuUpdates = await getRutorUpdates(RUTOR_CATEGORIES.seriesRu);
  const rutorMoviesRuUpdates = await getRutorUpdates(RUTOR_CATEGORIES.moviesRu);

  return { movies: rutorMoviesUpdates, series: rutorSeriesUpdates, seriesRu: rutorSeriesRuUpdates, moviesRu: rutorMoviesRuUpdates };
}
