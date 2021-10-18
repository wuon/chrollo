import { parse, HTMLElement } from "node-html-parser";

import gogoanimeClient from "./gogoanime";

import { Anime, Episode, RecentUpload } from "../../types";

const formatToRecentUpload = (htmlElement: HTMLElement) => {
  const href: string | undefined = htmlElement.getAttribute("href");
  const animeId: string = href?.match(/(?<=\/).*(?=-episode)/)?.pop() || '';
  const episodeId: string = href?.slice(1) || '';
  const episodeNumber: number = parseInt(href?.split("-").pop() || "-1");

  const anime: Anime = {
    name: htmlElement.getAttribute("title") || '',
    id: animeId,
  };

  const episode: Episode = {
    id: episodeId,
    episodeNumber
  };

  return {
    anime,
    episode,
  } as RecentUpload
};

const getRecentUploads = async() => {
  const response = await gogoanimeClient.get(`/`);
  const root = parse(response.data as string);
  return root.querySelectorAll('.items > li > .name > a').map(formatToRecentUpload);
};

export default getRecentUploads;
