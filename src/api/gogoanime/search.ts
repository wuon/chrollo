import { parse, HTMLElement } from "node-html-parser";

import gogoanimeClient from "./gogoanime";

import { Anime } from "../../types";

const formatToAnime = (htmlElement: HTMLElement) => {
  const id: string | undefined = htmlElement.getAttribute("href")?.slice(10);
  return {
    id,
    name: htmlElement.getAttribute("title"),
  } as Anime
};

export const search = async(keyword: string, page: number = 1) => {
  const response = await gogoanimeClient.get(`/search.html?keyword=${keyword}&page=${page}`);
  const root = parse(response.data as string);
  return root.querySelectorAll('.items > li > .name > a').map(formatToAnime);
};
