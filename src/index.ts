#!/usr/bin/env node

import ora from 'ora';
import { exec } from 'child_process';

import VERSION from './version';

import {
  search,
  selectAnime,
  selectEpisode,
  selectRecentUpload,
  selectMainAction
} from './prompts';
import { gogoanimeAPI } from './api';
import { Anime, Episode, RecentUpload } from './types';

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
    `Loading episode ${episode.episodeNumber}`
  ).start();
  const link = await apiClient.getEpisode(episode);
  const file = await apiClient.getFile(link);
  loadEpisodeSpinner.succeed(`Success! Now playing: ${anime.name}`);

  const command = `mpv --http-header-fields="Referer: ${link}" "https:${file}"`;

  exec(command);
};

const runCLI = async () => {
  console.log(LOGO);
  console.log(`Version: ${VERSION}`);

  const mainAction = await selectMainAction();

  if (mainAction === 'quit') {
    return;
  }

  if (mainAction === 'search') {
    const animeToSearch = await search();

    const animeSearchSpinner = ora('Fetching anime...').start();
    const animeSearchResults = await apiClient.searchForAnime(animeToSearch);
    animeSearchSpinner.succeed(
      `Successfully queried for results on: ${animeToSearch}`
    );

    const anime = await selectAnime(animeSearchResults);

    const getEpisodesSpinner = ora('Fetching episodes...').start();
    const episodes = await apiClient.getEpisodes(anime.id);
    getEpisodesSpinner.succeed(
      `Successfully queried for episodes on: ${anime.name}`
    );

    const episodeNumber = await selectEpisode(episodes.length);
    const episode = episodes[episodeNumber - 1];

    loadEpisodeToMPV(episode, anime);
  }

  if (mainAction === 'recentUploads') {
    const recentUploadsSpinner = ora(`Fetching recent uploads...`).start();
    const recentUploads = await apiClient.getRecentUploads();
    recentUploadsSpinner.succeed('Successfully queried for recent uploads.');

    const recentUpload: RecentUpload = await selectRecentUpload(recentUploads);
    const { episode, anime } = recentUpload;

    loadEpisodeToMPV(episode, anime);
  }
};

runCLI();
