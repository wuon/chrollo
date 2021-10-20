import inquirer from 'inquirer';

const selectMainAction = async () => {
  const choices = [
    {
      name: 'View recently uploaded anime',
      value: 'recentUploads'
    },
    {
      name: 'Search for anime',
      value: 'search'
    },
    {
      name: 'Quit',
      value: 'quit'
    }
  ];

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'mainAction',
      message: 'Select an option: ',
      choices
    }
  ]);

  return answers.mainAction as string;
};

export default selectMainAction;
