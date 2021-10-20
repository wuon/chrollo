import inquirer from 'inquirer';
import { RecentUpload } from '../types';

const formatChoice = (recentUpload: RecentUpload) => {
  return {
    name: `[Episode: ${recentUpload.episode.episodeNumber}] ${recentUpload.anime.name}`,
    value: recentUpload
  };
};

const selectRecentUpload = async (recentUploads: RecentUpload[]) => {
  const choices = recentUploads.map(formatChoice);
  const answers = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'recentUpload',
      message: `Select an episode from the list below: `,
      pageSize: 10,
      loop: false,
      choices
    }
  ]);
  return answers.recentUpload as RecentUpload;
};

export default selectRecentUpload;
