export interface Anime {
  id: string;
  name: string;
}

export interface Episode {
  id: string;
  episodeNumber: number;
}

export interface RecentUpload {
  anime: Anime;
  episode: Episode;
}

export interface ApiClient {
  getEpisode(episode: Episode): Promise<string>;
  getEpisodes(categoryId: string): Promise<Episode[]>;
  getFile(embeddedURL: string): Promise<string | null>;
  getRecentUploads(): Promise<RecentUpload[]>;
  searchForAnime(keyword: string, page?: number): Promise<Anime[]>;
}

export enum Action {
  RECENTUPLOADS,
  SEARCH,
  QUIT
}
