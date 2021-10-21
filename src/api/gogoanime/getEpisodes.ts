import { parse } from 'node-html-parser';

import gogoanimeClient from './gogoanime';

import { Episode } from '../../types';

const getEpisodes = async (categoryId: string) => {
  const results: Episode[] = [];
  const response = await gogoanimeClient.get(`/category/${categoryId}`);
  const root = parse(response.data as string);
  const htmlElement = root.querySelector('#episode_page > li > a');
  const endEpisode = parseInt(htmlElement?.getAttribute('ep_end') || '-1');

  for (let episodeNumber = 1; episodeNumber <= endEpisode; episodeNumber++) {
    results.push({
      id: `${categoryId}-episode-${episodeNumber}`,
      episodeNumber
    });
  }

  return results;
};

export default getEpisodes;
