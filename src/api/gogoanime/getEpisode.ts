import { parse, HTMLElement } from "node-html-parser";

import gogoanimeClient from "./gogoanime";

import { Episode } from "../../types";

const getEpisode = async(episode: Episode) => {
  const response = await gogoanimeClient.get(`/${episode.id}`);
  const root = parse(response.data as string);
  const htmlElement = root.querySelector('.vidcdn > a');
  return htmlElement?.getAttribute("data-video") || '';
};

export default getEpisode;
