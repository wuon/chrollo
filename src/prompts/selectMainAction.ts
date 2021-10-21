import inquirer from 'inquirer';
import { Action } from '../types';

const selectMainAction = async () => {
  const choices = [
    {
      name: 'View recently uploaded anime',
      value: Action.RECENTUPLOADS
    },
    {
      name: 'Search for anime',
      value: Action.SEARCH
    },
    {
      name: 'Quit',
      value: Action.QUIT
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

  return answers.mainAction as Action;
};

export default selectMainAction;
