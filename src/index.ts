#!/usr/bin/env node

import ora from "ora";
import { exec } from "child_process";

import gogoanimeAPI from "./api/gogoanime";
import { search, selectAnime } from "./prompts";
import selectEpisode from "./prompts/selectEpisode";

const runCLI = async () => {
  const animeToSearch = await search();
  
  const animeSearchSpinner = ora("Fetching anime...").start();
  const animeSearchResults = await gogoanimeAPI.search(animeToSearch);
  animeSearchSpinner.succeed(`Successfully queried for results on: ${animeToSearch}`);

  const animeChoices = animeSearchResults.map((animeChoice) => animeChoice.name)
  const animeName = await selectAnime(animeChoices);
  const anime = animeSearchResults.find((animeChoice) => animeChoice.name === animeName );

  const getEpisodesSpinner = ora("Fetching episodes...").start();
  const episodes = await gogoanimeAPI.getEpisodes(anime?.id || '');
  getEpisodesSpinner.succeed(`Successfully queried for episodes on: ${animeName}`);
  
  const episodeNumber = await selectEpisode(episodes.length);
  const episode = episodes[episodeNumber - 1];

  const loadEpisodeSpinner = ora(`Loading episode ${episode.episodeNumber}`).start();
  const link = await gogoanimeAPI.getEpisode(episode);
  const file = await gogoanimeAPI.getFile(link);
  loadEpisodeSpinner.succeed(`Sucess! Now playing: ${animeName}`);

  const command = `mpv --http-header-fields="Referer: ${link}" "https:${file}"` as any;

  exec(command);
}

runCLI();
