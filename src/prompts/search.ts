import inquirer from 'inquirer';

const search = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'animeSearch',
      message: 'Search for an anime: '
    }
  ]);
  return answers.animeSearch as string;
};

export default search;
