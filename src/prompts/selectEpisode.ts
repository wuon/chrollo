import inquirer from "inquirer";

const selectEpisode = async(maxEpisode: number) => {
  const answers = await inquirer.prompt([{
    type: 'input',
    name: 'episodeNumber',
    message: `Select an episode [1-${maxEpisode}]: `,
    validate(value) {
      const isNumber = value.match(/^\d+$/);
      if (!isNumber) {
        return 'Please enter a valid number.';
      }
      const userEpisodeInput = parseInt(value);
      if (userEpisodeInput <= 0 || userEpisodeInput > maxEpisode) {
        return `Please enter a number between 1 and ${maxEpisode}`;
      }
      return true;
    },
  }]);
  return answers.episodeNumber as number;
};

export default selectEpisode;
