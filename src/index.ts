#!/usr/bin/env node

import ora from 'ora';

import VERSION from './version';

import {
  search,
  selectAnime,
  selectEpisode,
  selectRecentUpload,
  selectMainAction
} from './prompts';
import { gogoanimeAPI } from './api';
import { Anime, Episode, Action, RecentUpload } from './types';
import { init } from './sections';
import mpv from './mpv';

const LOGO = `
            88                                    88  88               
            88                                    88  88               
            88                                    88  88               
 ,adPPYba,  88,dPPYba,   8b,dPPYba,   ,adPPYba,   88  88   ,adPPYba,   
a8"     ""  88P'    "8a  88P'   "Y8  a8"     "8a  88  88  a8"     "8a  
8b          88       88  88          8b       d8  88  88  8b       d8  
"8a,   ,aa  88       88  88          "8a,   ,a8"  88  88  "8a,   ,a8"  
 '"Ybbd8"'  88       88  88           '"YbbdP"'   88  88   '"YbbdP"' 
`;

const apiClient = gogoanimeAPI;

const loadEpisodeToMPV = async (episode: Episode, anime: Anime) => {
  const loadEpisodeSpinner = ora(
    `[1/4] Loading episode ${episode.episodeNumber}`
  ).start();
  const link = await apiClient.getEpisode(episode);
  loadEpisodeSpinner.text = '[2/4] Retriveing streaming file...';
  const file = await apiClient.getFile(link);
  loadEpisodeSpinner.text = '[3/4] Setting up mpv...';

  mpv().socket.on('mpv:file-loaded', () => {
    loadEpisodeSpinner.succeed(
      `[4/4] Success! Now playing episode ${episode.episodeNumber} from: ${anime.name}`
    );
    mpv().socket.removeAllListeners('mpv:file-loaded');
  });

  if (file) {
    try {
      await mpv().play(link, `https:${file}`);
    } catch (e) {
      console.log(e);
      console.error(
        'An unexpected error has occured. Please check the stacktrace above for more information.'
      );
    }
  }
};

const runCLI = async () => {
  console.log(LOGO);
  console.log(`Version: ${VERSION}`);

  await init();

  const mainAction = await selectMainAction();

  if (mainAction === Action.RECENTUPLOADS) {
    const recentUploadsSpinner = ora(`Fetching recent uploads...`).start();
    const recentUploads = await apiClient.getRecentUploads();
    recentUploadsSpinner.succeed('Successfully queried for recent uploads.');

    const recentUpload: RecentUpload = await selectRecentUpload(recentUploads);
    const { episode, anime } = recentUpload;

    await loadEpisodeToMPV(episode, anime);
  }

  if (mainAction === Action.SEARCH) {
    let animeSearchResults: Anime[] = [];
    do {
      const animeToSearch = await search();
      const animeSearchSpinner = ora('Fetching anime...').start();
      animeSearchResults = await apiClient.searchForAnime(animeToSearch);
      if (animeSearchResults.length === 0) {
        animeSearchSpinner.fail('No results found :( Try searching again!');
      } else {
        animeSearchSpinner.succeed(
          `Successfully queried for results on: ${animeToSearch}`
        );
      }
    } while (animeSearchResults.length === 0);

    const anime = await selectAnime(animeSearchResults);

    const getEpisodesSpinner = ora('Fetching episodes...').start();
    const episodes = await apiClient.getEpisodes(anime.id);
    getEpisodesSpinner.succeed(
      `Successfully queried for episodes on: ${anime.name}`
    );

    const episodeNumber = await selectEpisode(episodes.length);
    const episode = episodes[episodeNumber - 1];

    await loadEpisodeToMPV(episode, anime);
  }

  if (mainAction === Action.QUIT) {
    mpv().kill();
    return;
  }
};

runCLI();
