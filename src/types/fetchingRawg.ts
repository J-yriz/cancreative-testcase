export interface IGame {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: IRating[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: IAddedByStatus;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  user_game: any;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: IPlatform[];
  parent_platforms: IParentPlatform[];
  genres: IGenre[];
  stores: IStore[];
}

// Non exported types
interface IRating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

interface IAddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

interface IPlatformDetails {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  year_end: number | null;
  year_start: number | null;
  games_count: number;
  image_background: string;
}

interface IPlatform {
  platform: IPlatformDetails;
  released_at: string;
  requirements_en?: {
    minimum?: string;
    recommended?: string;
  } | null;
  requirements_ru?: any;
}

interface IParentPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

interface IGenre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

interface IStoreDetails {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
}

interface IStore {
  id: number;
  store: IStoreDetails;
}
