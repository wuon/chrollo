export interface Anime {
  id: string,
  name: string,
};

export interface Episode {
  id: string,
  episodeNumber: number,
};

export interface RecentUpload {
  anime: Anime,
  episode: Episode,
};
