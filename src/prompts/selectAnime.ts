import inquirer from 'inquirer';
import { Anime } from '../types';

const formatChoice = (anime: Anime) => {
  return {
    name: anime.name,
    value: anime,
  };
}

const selectAnime = async(animes: Anime[]) => {
  const choices = animes.map(formatChoice);
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'anime',
      message: 'Select an anime from the list below: ',
      pageSize: 10,
      loop: false,
      choices,
    },
  ]);
  return answers.anime as Anime;
}

export default selectAnime;
