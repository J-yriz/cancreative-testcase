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

export interface IDetailGame {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: MetacriticPlatform[];
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  reactions: Record<string, number>;
  added: number;
  added_by_status: Record<string, number>;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  reviews_text_count: number;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  user_game: any;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  parent_platforms: Platform[];
  platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
      image: string | null;
      year_end: number | null;
      year_start: number | null;
      games_count: number;
      image_background: string;
    };
    released_at: string;
    requirements?: {
      minimum?: string;
      recommended?: string;
    };
  }[];
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

// Detail game
interface Platform {
  platform: {
    platform: number;
    name: string;
    slug: string;
  };
}

interface MetacriticPlatform {
  metascore: number;
  url: string;
  platform: Platform["platform"];
}

interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}