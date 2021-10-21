import searchForAnime from './searchForAnime';
import getEpisode from './getEpisode';
import getEpisodes from './getEpisodes';
import getFile from './getFile';
import getRecentUploads from './getRecentUploads';

import { ApiClient } from '../../types';

const gogoanimeAPI: ApiClient = {
  getEpisode,
  getEpisodes,
  getFile,
  getRecentUploads,
  searchForAnime
};

export default gogoanimeAPI;
