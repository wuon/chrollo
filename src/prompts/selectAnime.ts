import inquirer from 'inquirer';

const selectAnime = async(choices: string[]) => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'anime',
      message: 'Select an anime from the list below: ',
      choices,
    },
  ])
  return answers.anime as string;
}

export default selectAnime;
