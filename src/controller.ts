import { RUTOR_CATEGORIES } from "./constants"
import { getRutorUpdates } from "./services"
import { Torrrents, Updates } from "./types.dto";

export const checkUpdates = async (): Promise<Updates> => {

  const rutorUpdates = await getRutorUpdates();

  return rutorUpdates;
}
