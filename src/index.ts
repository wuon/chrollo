#!/usr/bin/env node

import ora from "ora";
import figlet from "figlet";
import { exec } from "child_process";

import { VERSION } from "./version";

import { 
  search, 
  selectAnime, 
  selectEpisode, 
  selectRecentUpload, 
  selectMainAction 
} from "./prompts";
import { gogoanimeAPI } from "./api";
import { Anime, Episode, RecentUpload } from "./types";

const loadEpisodeToMPV = async(episode: Episode, anime: Anime) => {
  const loadEpisodeSpinner = ora(`Loading episode ${episode.episodeNumber}`).start();
  const link = await gogoanimeAPI.getEpisode(episode);
  const file = await gogoanimeAPI.getFile(link);
  loadEpisodeSpinner.succeed(`Success! Now playing: ${anime.name}`);

  const command = `mpv --http-header-fields="Referer: ${link}" "https:${file}"` as any;

  exec(command);
}

const runCLI = async () => {
  const mainAction = await selectMainAction();

  if (mainAction === "quit") {
    return;
  }

  if (mainAction === "search") {
    const animeToSearch = await search();
  
    const animeSearchSpinner = ora("Fetching anime...").start();
    const animeSearchResults = await gogoanimeAPI.searchForAnime(animeToSearch);
    animeSearchSpinner.succeed(`Successfully queried for results on: ${animeToSearch}`);

    const anime = await selectAnime(animeSearchResults);

    const getEpisodesSpinner = ora("Fetching episodes...").start();
    const episodes = await gogoanimeAPI.getEpisodes(anime.id);
    getEpisodesSpinner.succeed(`Successfully queried for episodes on: ${anime.name}`);

    const episodeNumber = await selectEpisode(episodes.length);
    const episode = episodes[episodeNumber - 1];

    loadEpisodeToMPV(episode, anime);
  }

  if (mainAction === "recentUploads") {
    const recentUploadsSpinner = ora(`Fetching recent uploads...`).start();
    const recentUploads = await gogoanimeAPI.getRecentUploads();
    recentUploadsSpinner.succeed('Successfully queried for recent uploads.')

    const recentUpload: RecentUpload = await selectRecentUpload(recentUploads);
    const {episode, anime} = recentUpload;

    loadEpisodeToMPV(episode, anime);
  }
}

figlet('chrollo', {
  font: 'Univers',
}, (_err, data) => {
  console.log(data);
  console.log(`Version: ${VERSION}`);
  runCLI();
});
