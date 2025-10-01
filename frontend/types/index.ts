export interface User {
  id: string;
  display_name: string;
  images: Array<{ url: string }>;
}

export interface Track {
  id: string;
  name: string;
  artists: Array<{ name: string; id: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  duration_ms: number;
  external_urls: { spotify: string };
}

export interface Artist {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  genres: string[];
  followers: { total: number };
  external_urls: { spotify: string };
}

export interface GenreData {
  name: string;
  count: number;
  percentage: number;
  [key: string]: any;
}
